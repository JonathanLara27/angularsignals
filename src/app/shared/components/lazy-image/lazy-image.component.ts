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
    // NgOptimizedImage
  ],
})
export class LazyImageComponent {
  @Input() public url!: string;
  @Input() public alt: string = '';
  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL es requerida.');
  }

  onLoad(): void {
    timer(1000).subscribe(() => this.hasLoaded = true);
  }
}
