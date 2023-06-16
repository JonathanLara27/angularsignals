import { Component, inject, signal } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule } from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';



@Component({
  selector: 'products-product-page',
  templateUrl: './product.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTooltipModule
  ],
})
export class ProductComponent {


  private _snackBarService = inject(SnackbarService)

  public products = signal<Product[]>([
    {
      name: 'Teclado gamer',
      price: 100,
      readonly: true,
      edit: true,
    },
    {
      name: 'Mouse gamer',
      price: 50,
      readonly: true,
      edit: true,
    },
    {
      name: 'Monitor gamer',
      price: 200,
      readonly: true,
      edit: true,
    },
    {
      name: 'Audifonos gamer',
      price: 150,
      readonly: true,
      edit: true,
    }
  ])

  private temporalProduct!: Product;
  
  public addProducts(){
    this.products.set([...this.products(), {name: 'New Product', price: 0, readonly: true, edit: true,}]);
    this._snackBarService.showSuccess('Producto agregado existosamente.');
  }
  public deleteProduct(index: number) {
    this.products().splice(index,1)
    this._snackBarService.showSuccess('Producto eliminado existosamente.');
  }

  public changeToEdit(product: Product, index: number){
    this.temporalProduct={...product};
    this.products()[index].readonly=!this.products()[index].readonly;
    this.products.mutate( product =>product[0].edit=true);
  }

  public cancelEdition(index: number){
    this.products.mutate( product => {
      product[index]=this.temporalProduct;
      product[index].readonly=true;
    })
    this.setEditProducts();
  }

  public saveEdition(index: number) {
    const product = this.products()[index];
    product.readonly = !product.readonly;
    if (product.name.length <= 3) {
      this._snackBarService.showError('Asigna un nombre con más de 3 caracteres.');
      this.products.mutate( product =>product[index]=this.temporalProduct);
    } else if (product.price <= 0) {
      this._snackBarService.showError('Asigna un precio mayor a 0.');
      this.products()[index] = this.temporalProduct;
    } else {
      this._snackBarService.showSuccess('Producto editado correctamente.');
    }
  
    this.setEditProducts();
  }
  

  private setEditProducts(){
    this.products.update(products => products.map((product) => {
      product.edit=true;
      return product;
    }));
  }
}


