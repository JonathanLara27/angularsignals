import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  public rutas= signal<String[]>([
    'productSignal',
    'rickmorty'
  ])

}
