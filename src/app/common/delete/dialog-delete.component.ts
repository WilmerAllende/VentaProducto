import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog-delete.component.html',
  styles: [],
})
export class DialogDeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {}

  ngOnInit(): void {}
}
