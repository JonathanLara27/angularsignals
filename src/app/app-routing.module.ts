import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    title: 'Products Signals',
    path: 'productSignal',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    title: 'API rick morty',
    path: 'rickmorty',
    loadChildren: () => import('./rick-morty/rick-morty.module').then(m=> m.RickMortyModule)
  },
  {
    path: '**',
    redirectTo: 'productSignal',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
