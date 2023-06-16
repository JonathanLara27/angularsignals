import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Character, CharacterResponse } from '../../interfaces';
import { CharactersService } from '../../services/characters.service';
import { MatIconModule } from '@angular/material/icon';
import { CardListComponent } from './components/card-list/card-list.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';


@Component({
  templateUrl: './characters.component.html',
  standalone: true,
  imports: [
    MatIconModule,
    MatPaginatorModule,
    CardListComponent,
  ]
})
export class CharactersComponent implements OnInit {

  public characters = signal<Character[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _characterService = inject(CharactersService);
  private _snackBarService = inject(SnackbarService);
  private pageIndex: number = 1;
  private currentPage: number = 0;
  private KeyEnterSearch: boolean = false;
  private namefilter = signal<string>('');
  ngOnInit() {
    this.getAllCharactersPage(this.pageIndex);
  }

  private getAllCharactersPage(page: number) {
    this._characterService.getAllCharactersPage(page).subscribe({
      next: (response: CharacterResponse) => {
        this.characters.set(response.results)
        this.paginator.length = response.info.count;
      },
      error: (message) => console.log(message)
    })
  }

  private getCharacterByName(page: number, name: string) {
    this._characterService.getCharacterByName(page, name).subscribe({
      next: (response: CharacterResponse) => {
        this.characters.set(response.results)
        this.paginator.length = response.info.count;
        this._snackBarService.showSuccess(`${response.info.count} resultados encontrados para: ${name}`);
      },
      error: (message) => this._snackBarService.showError(message)
    })
  }

  public onInput(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length === 0 && this.KeyEnterSearch) {
      this.clearFilter();
      this.KeyEnterSearch = false;
    }
  }

  public onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchByName(event);
      this.KeyEnterSearch = true;
    }
  }

  private searchByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length === 0) {
      this._snackBarService.showError('Ingresa un valor para filtrar');
      return;
    }

    this.namefilter.set(filterValue);
    this.resetPage();
    this.getCharacterByName(this.pageIndex, filterValue);
  }

  private resetPage() {
    this.currentPage = 0;
    this.pageIndex = 1;
    this.paginator.pageIndex = this.currentPage;
  }

  private clearFilter() {
    this.namefilter.set('');
    this.resetPage();
    this.getAllCharactersPage(this.pageIndex);
  }

  public onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    if (this.namefilter().length > 0) {
      this.getCharacterByName(this.currentPage, this.namefilter());
    } else {
      this.getAllCharactersPage(this.currentPage);
    }
  }
}
