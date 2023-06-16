import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private snackbarRef: MatSnackBarRef<any> | null = null;
  constructor(private snackBar: MatSnackBar) {}

  public showError(message: string): void {
    this.snackbarRef = this.snackBar.open(message, ' ', { duration: 5000, panelClass: ['snackbar-error'] });
    this.snackbarRef.afterDismissed().subscribe(() => {
      this.snackbarRef = null;
    });
  }

  public showSuccess(message: string): void {
    this.snackbarRef = this.snackBar.open(message, ' ', { duration: 10000, panelClass: ['snackbar-success'] });
    this.snackbarRef.afterDismissed().subscribe(() => {
      this.snackbarRef = null;
    });
  }
  public isSnackbarVisible(): boolean {
    return !!this.snackbarRef;
  }
}
