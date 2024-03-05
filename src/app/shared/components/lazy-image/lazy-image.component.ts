import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { timer } from 'rxjs';
// import { NgOptimizedImage } from '@angular/common'
@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class LazyImageComponent {
  @Input({required: true}) public url!: string;
  @Input() public alt: string = '';
}
