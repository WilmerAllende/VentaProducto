import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiClienteService } from '../../services/api-cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../models/cliente';
@Component({
  templateUrl: './dialogCliente.component.html',
})
export class DialogClienteComponent implements OnInit {
  nombre: string;
  constructor(
    public dialogRef: MatDialogRef<DialogClienteComponent>,
    public service: ApiClienteService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ) {
    if (this.cliente !== null) {
      this.nombre = this.cliente.nombre;
    }
  }
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  close() {
    this.dialogRef.close();
  }
  addCliente() {
    const cliente: Cliente = { nombre: this.nombre, id: 0 };
    this.service.addCliente(cliente).subscribe((response) => {
      if (response.exito === 1) {
        this.dialogRef.close();
        this.snackBar.open('Cliente insertado con exito', '', {
          duration: 2000,
        });
      }
    });
  }

  editCliente() {
    const cliente: Cliente = { nombre: this.nombre, id: this.cliente.id };
    this.service.editCliente(cliente).subscribe((response) => {
      if (response.exito === 1) {
        this.dialogRef.close();
        this.snackBar.open('Cliente editado con exito', '', {
          duration: 2000,
        });
      }
    });
  }
}
