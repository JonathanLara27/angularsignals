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
