import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Character } from 'src/app/rick-morty/interfaces';
import { LazyImageComponent } from 'src/app/shared/components/lazy-image/lazy-image.component';

@Component({
  selector: 'characters-card-item',
  templateUrl: './card-item.component.html',
  standalone: true,
  imports: [
    CommonModule,
    LazyImageComponent,
  ]
})
export class CardItemComponent {
  @Input() public character!: Character;
  ngOnInit(): void {
    if (!this.character) throw new Error('La propiedad character es requerida.');
  }
}
