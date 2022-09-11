import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotasService } from '../../services/mascotas.service';

@Component({
    selector: 'app-form-mascotas',
    templateUrl: './form-mascotas.component.html',
    styleUrls: ['./form-mascotas.component.scss'],
})
export class FormMascotasComponent implements OnInit {
    mascotaForm: FormGroup;
    petRaces: any[] = [];
    petSpecies: any[] = [];
    petSaved = false;

    constructor(
        private _fb: FormBuilder,
        private mascotasService: MascotasService,
        public dialogRef: MatDialogRef<FormMascotasComponent>,
        private _snackBar: MatSnackBar
    ) {
        this.mascotasService.getAllSpecies().subscribe((resSpecies) => {
            this.petSpecies = resSpecies;
            this.mascotasService.getAllRaces().subscribe((resRaces) => {
                this.petRaces = resRaces;
            });
        });
    }

    ngOnInit(): void {
        this.mascotaForm = this._fb.group({
            specieId: [''],
            raceId: [''],
            name: ['', [Validators.required]],
            birthDate: ['', [Validators.required]],
            furColor: ['', Validators.required],
            lastWeight: ['', Validators.required],
            photoUrl: [''],
        });
    }

    save(): void {
        if (!this.petSaved) {
            this.mascotasService
                .savePet(this.mascotaForm.value)
                .subscribe((res) => {
                    this._snackBar.open('Mascota registrada.', 'OK', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 5000,
                        panelClass: ['bg-white', 'text-black'],
                    });
                    this.petSaved = true;
                });
        }
    }
}
