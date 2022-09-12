import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentType, MedicoPersona, User } from 'app/shared/interfaces';
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
    medicoData!: User;
    documentTypes: DocumentType[];
    passwordUpdateMode = false;

    constructor(
        private medicosService: MedicosService,
        public dialogRef: MatDialogRef<FormMedicosComponent>,
        private _snackBar: MatSnackBar,
        private _sharedService: SharedService,
        private _fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data?: MedicoPersona
    ) {
        this._sharedService.getAllDocumentTypes().subscribe((res) => {
            this.documentTypes = res;
        });

        if (data) {
            this.medicoSaved = true;
        }
    }

    ngOnInit(): void {
        this.medicoForm = this._fb.group({
            documentType: [
                this.data?.person.documentTypeId,
                Validators.required,
            ],
            documentNumber: [
                this.data?.person.documentNumber,
                [Validators.required],
            ],
            fullName: [this.data?.person.fullName, [Validators.required]],
            email: [this.data?.email, [Validators.email, Validators.required]],
            password: [
                { value: '', disabled: this.medicoSaved },
                Validators.required,
            ],
            phoneNumber: [this.data?.person.cellphone, Validators.required],
        });
    }

    managePasswordUpdate(): void {
        this.passwordUpdateMode = !this.passwordUpdateMode;

        if (this.passwordUpdateMode) {
            this.medicoForm.controls.password.enable();
        } else {
            this.medicoForm.controls.password.setValue('');
            this.medicoForm.controls.password.disable();
        }
    }

    save(): void {
        // Do nothing if the form is invalid
        if (this.medicoForm.invalid) {
            return;
        }

        // Disable the form
        this.medicoForm.disable();

        if (!this.medicoSaved) {
            // Sign up
            this.medicosService.signUpDoctor(this.medicoForm.value).subscribe(
                () => {
                    this._snackBar.open('Medico registrado', 'OK', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 5000,
                        panelClass: ['bg-white', 'text-black'],
                    });
                    this.medicoSaved = true;
                    this.medicoForm.enable();
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
        } else {
            // Update
            this.medicosService
                .updateDoctor(this.medicoForm.getRawValue())
                .subscribe(
                    () => {
                        this._snackBar.open('Medico actualizado', 'OK', {
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            duration: 5000,
                            panelClass: ['bg-white', 'text-black'],
                        });
                        // Re-enable the form
                        this.medicoForm.enable();

                        this.passwordUpdateMode = false;
                        this.medicoForm.controls.password.setValue('');
                        this.medicoForm.controls.password.disable();
                    },
                    (error) => {
                        // Re-enable the form
                        this.medicoForm.enable();

                        this.passwordUpdateMode = false;
                        this.medicoForm.controls.password.setValue('');
                        this.medicoForm.controls.password.disable();

                        this._snackBar.open(
                            `Error al actualizar la informacion del medico. ${error.error.message}`,
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
