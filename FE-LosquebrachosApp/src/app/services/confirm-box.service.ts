import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmBoxComponent } from '../mat-confirm-box/mat-confirm-box.component';


@Injectable({
    providedIn: 'root'
  })
  export class ConfirmBoxService {

    constructor(private dialog: MatDialog){}

    openConfirmDialog(msg: string){
       return this.dialog.open(MatConfirmBoxComponent, {
           width: '280px',
           panelClass: 'confirm-dialog-container',
           disableClose: true,
           position: {top: '20px', right: '20px'},
           data: msg
        });
    }
  }