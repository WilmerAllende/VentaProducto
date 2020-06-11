import { Component, OnInit } from '@angular/core';
import { ApiClienteService } from '../services/api-cliente.service';
import { DialogClienteComponent } from './dialog/dialogCliente.component';
import { Cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  public lst: any;
  columnas: string[] = ['id', 'nombre', 'acciones'];
  readonly width = '300';
  constructor(
    private service: ApiClienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.service.getClientes().subscribe((response) => {
      this.lst = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getClientes();
    });
  }

  openEdit(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width,
      data: cliente,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getClientes();
    });
  }
  eliminar(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteCliente(cliente.id).subscribe((response) => {
          if (response.exito === 1) {
            this.snackBar.open('Cliente eliminado con exito', '', {
              duration: 2000,
            });
            this.getClientes();
          }
        });
      }
    });
  }
}
