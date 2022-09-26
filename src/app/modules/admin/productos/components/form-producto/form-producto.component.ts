import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductosService } from '../../services/productos.service';

@Component({
    selector: 'app-form-producto',
    templateUrl: './form-producto.component.html',
    styleUrls: ['./form-producto.component.scss'],
})
export class FormProductoComponent implements OnInit {
    productoForm: FormGroup;
    productoSaved = false;
    productId: string;

    constructor(
        private productosService: ProductosService,
        public dialogRef: MatDialogRef<FormProductoComponent>,
        private _snackBar: MatSnackBar,
        private _fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data?: any
    ) {
        if (data) {
            this.productoSaved = true;
            this.productId = data.id;
        }
    }

    ngOnInit(): void {
        this.productoForm = this._fb.group({
            productName: [this.data?.productName, Validators.required],
            currentStock: [
                this.data?.currentStock,
                [Validators.required, Validators.min(0)],
            ],
        });
    }

    save(): void {
        // Do nothing if the form is invalid
        if (this.productoForm.invalid) {
            return;
        }
        this.productoForm.disable();

        if (!this.productoSaved) {
            this.productosService
                .saveProducto(this.productoForm.value)
                .subscribe(
                    (res) => {
                        this._snackBar.open('Producto Registrado', 'OK', {
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            duration: 5000,
                            panelClass: ['bg-white', 'text-black'],
                        });
                        this.productoForm.enable();
                        this.productoSaved = true;
                        this.productId = res.id;
                    },
                    (error) => {
                        // Re-enable the form
                        this.productoForm.enable();

                        this._snackBar.open(
                            `Error al registrar el producto. ${error.error.message}`,
                            'OK',
                            {
                                horizontalPosition: 'right',
                                verticalPosition: 'top',
                                duration: 5000,
                                panelClass: ['bg-red-500', 'text-white'],
                            }
                        );
                    }
                );
        } else {
            this.productosService
                .updateProducto(this.productId, this.productoForm.value)
                .subscribe((res) => {
                    this._snackBar.open(
                        'Informacion del producto actualizada.',
                        'OK',
                        {
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            duration: 5000,
                            panelClass: ['bg-white', 'text-black'],
                        }
                    );
                    this.productoForm.enable();
                });
        }
    }
}
