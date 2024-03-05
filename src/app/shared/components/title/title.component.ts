
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
  ],
  template: `
  <div class="shadow my-3 rounded text-center bg-dark text-white">
    <h1 class="py-3">{{title}}</h1>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  @Input({required: true}) title!: string;
 }
