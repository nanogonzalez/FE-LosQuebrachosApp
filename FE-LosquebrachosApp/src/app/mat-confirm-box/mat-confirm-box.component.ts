import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm-box',
  templateUrl: './mat-confirm-box.component.html',
  styleUrls: ['./mat-confirm-box.component.css']
})
export class MatConfirmBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<MatConfirmBoxComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
