import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Character } from 'src/app/rick-morty/interfaces';
import { CardItemComponent } from '../card-item/card-item.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
@Component({
  selector: 'characters-card-list',
  templateUrl: './card-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CardItemComponent,

    LoadingSpinnerComponent,
  ]
})
export class CardListComponent {
  @Input({required: true}) characters = signal<Character[]>([]);
}
