import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductosService } from 'app/modules/admin/productos/services/productos.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
    selector: 'app-form-item-receta',
    templateUrl: './form-item-receta.component.html',
    styleUrls: ['./form-item-receta.component.scss'],
})
export class FormItemRecetaComponent implements OnInit {
    itemForm: FormGroup;
    itemSaved = false;
    products: any[] = [];
    filteredProducts: Observable<any[]>;
    isLoading = false;

    constructor(
        public dialogRef: MatDialogRef<FormItemRecetaComponent>,
        private _productsService: ProductosService,
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.isLoading = true;

        this._productsService.getAllProductos().subscribe((res) => {
            this.products = res;
            this.isLoading = false;
        });

        this.itemForm = this._fb.group({
            id: [''],
            productName: ['', Validators.required],
            posology: ['', [Validators.required]],
            totalDose: ['', [Validators.required]],
        });

        this.filteredProducts =
            this.itemForm.controls.productName.valueChanges.pipe(
                startWith(''),
                // eslint-disable-next-line arrow-parens
                map((value) => this._filter(value || ''))
            );
    }

    displayProductFn(product: any): string {
        return product.productName;
    }

    productSelected($event: MatAutocompleteSelectedEvent): void {
        this.itemForm.controls.id.setValue($event.option.value.id);
    }

    save(): void {
        if (this.itemForm.invalid) {
            return;
        }

        if (typeof this.itemForm.controls.productName.value !== 'string') {
            this.itemForm.controls.productName.setValue(
                this.itemForm.controls.productName.value.productName
            );
        }

        this.dialogRef.close(this.itemForm.value);
    }

    private _filter(value: string | any): any[] {
        if (typeof value !== 'string') {
            value = value.productName;
        }

        const filterValue = value.toLowerCase();

        // eslint-disable-next-line arrow-parens
        return this.products.filter((producto) =>
            producto.productName.toLowerCase().includes(filterValue)
        );
    }
}
