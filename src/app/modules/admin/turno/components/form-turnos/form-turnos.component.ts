import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotasService } from 'app/modules/admin/mascotas/services/mascotas.service';
import { TurnosService } from '../../services/turnos.service';

@Component({
    selector: 'app-form-turnos',
    templateUrl: './form-turnos.component.html',
    styleUrls: ['./form-turnos.component.scss'],
})
export class FormTurnosComponent implements OnInit {
    turnoForm: FormGroup;
    turnoSaved = false;
    pets: any[] = [];
    minDate: Date;

    constructor(
        private turnosService: TurnosService,
        public dialogRef: MatDialogRef<FormTurnosComponent>,
        private _snackBar: MatSnackBar,
        private _fb: FormBuilder,
        private mascotasService: MascotasService
    ) {
        this.minDate = new Date();
    }

    getPetsList(): void {
        this.mascotasService.getAllPetsByUser().subscribe((res) => {
            this.pets = res;
        });
    }

    ngOnInit(): void {
        this.getPetsList();
        this.turnoForm = this._fb.group({
            reason: ['', Validators.required],
            date: ['', [Validators.required]],
            pets: ['', [Validators.required]],
        });
    }

    save(): void {
        // Do nothing if the form is invalid
        if (this.turnoForm.invalid) {
            return;
        }

        if (!this.turnoSaved) {
            this.turnoForm.disable();

            this.turnosService.saveTurno(this.turnoForm.value).subscribe(
                () => {
                    this._snackBar.open('Turno Registrado', 'OK', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 5000,
                        panelClass: ['bg-white', 'text-black'],
                    });
                    this.turnoForm.enable();
                    this.turnoSaved = true;
                },
                (error) => {
                    // Re-enable the form
                    this.turnoForm.enable();

                    this._snackBar.open(
                        `Error al registrar el turno. ${error.error.message}`,
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
