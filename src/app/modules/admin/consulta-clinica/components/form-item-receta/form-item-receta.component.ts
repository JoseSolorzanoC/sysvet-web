import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-form-item-receta',
    templateUrl: './form-item-receta.component.html',
    styleUrls: ['./form-item-receta.component.scss'],
})
export class FormItemRecetaComponent implements OnInit {
    itemForm: FormGroup;
    itemSaved = false;

    constructor(
        public dialogRef: MatDialogRef<FormItemRecetaComponent>,
        private _snackBar: MatSnackBar,
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.itemForm = this._fb.group({
            productName: ['', Validators.required],
            posology: ['', [Validators.required]],
            totalDose: ['', [Validators.required]],
        });
    }

    save(): void {
        if (this.itemForm.invalid) {
            return;
        }

        this.dialogRef.close(this.itemForm.value);
    }
}
