import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [
    MatProgressBarModule
  ],
  template: `
  <div class="my-2">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  </div>
  `,
})
export class LoadingSpinnerComponent { }
