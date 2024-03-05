import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Product } from 'src/app/products/interfaces/product.interface';
import { isValidField, getFieldErrors } from 'src/app/shared/functions/validateForms';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [SnackbarService],
  templateUrl: './modal-create-product.component.html',
})
export class ModalCreateProductComponent {
  
  formGroupProduct: FormGroup = this.fb.group({
    name: [this.data.product?.name || '', [Validators.required, Validators.pattern('^[a-zA-Z_\\-\\s]*$'), Validators.minLength(3), Validators.maxLength(50)]],
    price: [this.data.product?.price || null, [Validators.required, Validators.min(1)]],
    id: [this.data.product?.id || this.data.length +1, [Validators.required]]
  });


  constructor(
    public dialogRef: MatDialogRef<ModalCreateProductComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, length: number, product?: Product}
  ) {

  }

  isValidField(field: string, fg: FormGroup): boolean | null {
    return isValidField(field, fg);
  }

  getFieldErrors(field: string, fg: FormGroup): string | null {
    return getFieldErrors(field, fg);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  saveProduct(): void {
    if(this.formGroupProduct.invalid) return this.snackbarService.showError('Formulario inválido');
    this.dialogRef.close(this.formGroupProduct.value);
  }
 }
