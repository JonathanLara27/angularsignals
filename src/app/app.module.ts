import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Internationalization } from './shared/functions/optionsPaginator';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalInterceptor } from './rick-morty/services/global.interceptor';

const snackBarConfig = {
  horizontalPosition: 'center',
  verticalPosition: 'top',
};

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,

    NavbarComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: Internationalization },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: snackBarConfig },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
