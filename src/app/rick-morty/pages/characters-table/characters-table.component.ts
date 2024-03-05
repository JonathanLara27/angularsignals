import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Character, CharacterResponse } from '../../interfaces';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CharactersService } from '../../services/characters.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn } from 'src/app/shared/interfaces/table-colums.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from '../../services/global.interceptor';
import { Subscription, timer } from 'rxjs';
import { LoadingService } from '../../services/loading-http.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-characters-table',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,

    TableComponent,
    LoadingSpinnerComponent,
  ],
  providers:[
    CharactersService,LoadingService,
    {provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true}
  ],
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersTableComponent implements OnInit {

  public characters = signal<Character[]>([]);

  private _characterService = inject(CharactersService);
  private _snackBarService = inject(SnackbarService);
  private _loadingService = inject(LoadingService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private pageIndex: number = 1;
  private currentPage: number = 0;
  private classbyStatus: any ={
    Alive: 'text-success',
    Dead: 'text-danger',
    unknown: 'text-warning'
  }
  public columns: TableColumn[] = [
    {
      columnDef: 'name',
      header: 'Nombre',
      cell: (element: Character) => `${element.name}`,
    },
    {
      columnDef: 'status',
      header: 'Estado',
      cell: (element: Character) => `${element.status}`,
      class: (element: Character) => `${this.classbyStatus[element.status]}`,
    },
    {
      columnDef: 'species',
      header: 'Especie',
      cell: (element: Character) => `${element.species}`,
    },
    {
      columnDef: 'type',
      header: 'Tipo',
      cell: (element: Character) => `${element.type? element.type : 'Sin registro'}`,
    },
    {
      columnDef: 'gender',
      header: 'Género',
      cell: (element: Character) => `${element.gender}`,
    },
    {
      columnDef: 'origin',
      header: 'Origen',
      cell: (element: Character) => `${element.origin.name}`,
    },
    {
      columnDef: 'location',
      header: 'Ubicación',
      cell: (element: Character) => `${element.location.name}`,
    },
  ];
  

  ngOnInit() {
    this.getAllCharactersPage(this.pageIndex);
  }

  private getAllCharactersPage(page: number) {
    this._characterService.getAllCharactersPage(page).subscribe({
      next: (response: CharacterResponse) => {
        this.characters.set(response.results)
        this.paginator.length = response.info.count;
      },
      error: (message) => this._snackBarService.showError(message)
    })
  }

  public onPageChange(event: any): void {
    this.characters.set([]);
    this.currentPage = event.pageIndex + 1;
    this.getAllCharactersPage(this.currentPage);
  }

}
