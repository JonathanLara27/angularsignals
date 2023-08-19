import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'characters', loadComponent: ()=> import('./pages/characters/characters.component').then(m => m.CharactersComponent)
      },
      {
        path: 'characters-table', loadComponent: ()=> import('./pages/characters-table/characters-table.component').then(m => m.CharactersTableComponent)
      },
      {
        path: '**', redirectTo: 'characters'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RickMortyRoutingModule { }
