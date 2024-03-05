import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
import { ModalOptions } from 'src/app/shared/interfaces/modalOptions.interface';
import { openModal } from 'src/app/shared/functions/OpenModal.function';
import { ModalCreateProductComponent } from 'src/app/shared/components/modal-create-product/modal-create-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from 'src/app/shared/components/modal-confirmacion/modal-confirmacion.component';
import { productInitial } from 'src/app/shared/constants';
import { TitleComponent } from 'src/app/shared/components/title/title.component';



@Component({
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
    MatTooltipModule,

    TitleComponent,
  ],
  providers: [SnackbarService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {

  constructor(
    private dialog: MatDialog,
    private _snackBarService: SnackbarService
    ) {}

  public products = signal<Product[]>(productInitial)

  private createProduct(product: Product) {
    this.products.set([...this.products(), product]);
    this._snackBarService.showSuccess(`Producto ${product.name} creado exitosamente.`);
  }

  private deleteProduct(product: Product){
    this.products.set(this.products().filter(p => p !== product));
    this._snackBarService.showSuccess(`Producto ${product.name} eliminado exitosamente.`);
  }
  private editProduct(product: Product, result: Product) {
    this._snackBarService.showSuccess(`Producto ${product.name} editado exitosamente.`);
    this.products.set(this.products().map(p => p.id === result.id ? result : p));
  }

 public openModalCreateProduct(): void {
    const options: ModalOptions = {
      data: {
        title: 'Crear producto',
        length: this.products().length
      },
      width: '800px',
    }
    const dialogRef = openModal(this.dialog, ModalCreateProductComponent, options);
    dialogRef.afterClosed().subscribe((result: Product | null) => {
      if (!result) return;
      this.createProduct(result);
    });
  }

 public openModalEditProduct(product: Product){
    const options: ModalOptions = {
      data: {
        title: 'Editar producto',
        product,
        length: this.products().length
      },
      width: '800px',
    }
    const dialogRef = openModal(this.dialog, ModalCreateProductComponent, options);
    dialogRef.afterClosed().subscribe((result: Product | null) => {
      if (!result) return;
      this.editProduct(product,result);
    });
  }

 public openModalConfirmacionDelete(product: Product){
    const options: ModalOptions = {
      data: {
        title: 'Eliminar producto',
        message: `¿Estás seguro de que quieres eliminar el producto "${product.name}" ?`
      },
      width: '400px',
    }
    const dialogRef = openModal(this.dialog, ModalConfirmacionComponent, options);
    dialogRef.afterClosed().subscribe((result: boolean | null) => {
      if (!result) return;
      this.deleteProduct(product);
    });
  }
  
}


