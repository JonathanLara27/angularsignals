import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalOptions } from '../interfaces/modalOptions.interface'

export function openModal(dialog: MatDialog, component: any, options: ModalOptions = {}): MatDialogRef<any> {
    const dialogRef = dialog.open(component, {...options, disableClose: true});
    // dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed', result);
    // });
    return dialogRef;
}