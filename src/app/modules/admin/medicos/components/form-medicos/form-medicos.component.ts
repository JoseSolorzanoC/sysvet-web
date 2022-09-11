import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'app/shared/shared.service';
import { MedicosService } from '../../services/medicos.service';

@Component({
    selector: 'app-form-medicos',
    templateUrl: './form-medicos.component.html',
    styleUrls: ['./form-medicos.component.scss'],
})
export class FormMedicosComponent implements OnInit {
    medicoForm: FormGroup;
    medicoSaved = false;
    documentTypes: DocumentType[];

    constructor(
        private medicosService: MedicosService,
        public dialogRef: MatDialogRef<FormMedicosComponent>,
        private _snackBar: MatSnackBar,
        private _sharedService: SharedService,
        private _fb: FormBuilder
    ) {
        this._sharedService.getAllDocumentTypes().subscribe((res) => {
            this.documentTypes = res;
        });
    }

    ngOnInit(): void {
        this.medicoForm = this._fb.group({
            documentType: ['', Validators.required],
            documentNumber: ['', [Validators.required]],
            fullName: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
            phoneNumber: ['', Validators.required],
        });
    }

    save(): void {
        if (!this.medicoSaved) {
            // Do nothing if the form is invalid
            if (this.medicoForm.invalid) {
                return;
            }

            // Disable the form
            this.medicoForm.disable();

            // Sign up
            this.medicosService.signUpDoctor(this.medicoForm.value).subscribe(
                (response) => {
                    this._snackBar.open('Medico registrado', 'OK', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 5000,
                        panelClass: ['bg-white', 'text-black'],
                    });
                },
                (error) => {
                    // Re-enable the form
                    this.medicoForm.enable();

                    // Reset the form
                    this.medicoForm.controls.documentNumber.reset();
                    this.medicoForm.controls.email.reset();

                    this._snackBar.open(
                        `Error al registrar al medico. ${error.error.message}`,
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
        }
    }
}
