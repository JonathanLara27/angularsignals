import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/rick-morty/services/loading-http.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from 'src/app/rick-morty/services/global.interceptor';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
    LoadingService
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  isLoading!: boolean;
  subscriptionLoading!: Subscription;
  private _loadingService = inject(LoadingService);

  public rutas= signal<String[]>([
    'productSignal',
    'rickmorty'
  ])

  oninit(){
    this.subscriptionLoading = this._loadingService.loading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
}
