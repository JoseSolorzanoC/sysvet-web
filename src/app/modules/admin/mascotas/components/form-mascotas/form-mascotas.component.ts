import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PetRace, PetSpecie } from 'app/shared/interfaces';
import { MascotasService } from '../../services/mascotas.service';

@Component({
    selector: 'app-form-mascotas',
    templateUrl: './form-mascotas.component.html',
    styleUrls: ['./form-mascotas.component.scss'],
})
export class FormMascotasComponent implements OnInit {
    mascotaForm: FormGroup;
    petRaces: PetRace[] = [];
    petSpecies: PetSpecie[] = [];
    petSaved = false;
    petId: string;

    constructor(
        private _fb: FormBuilder,
        private mascotasService: MascotasService,
        public dialogRef: MatDialogRef<FormMascotasComponent>,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data?: any
    ) {
        this.mascotasService.getAllSpecies().subscribe((resSpecies) => {
            this.petSpecies = resSpecies;
            this.mascotasService.getAllRaces().subscribe((resRaces) => {
                this.petRaces = resRaces;
            });
        });

        if (data) {
            this.petSaved = true;
            this.petId = data.id;
        }
    }

    ngOnInit(): void {
        this.mascotaForm = this._fb.group({
            specieId: [this.data?.specieId],
            raceId: [this.data?.raceId],
            name: [this.data?.name, [Validators.required]],
            birthDate: [this.data?.birthDate, [Validators.required]],
            furColor: [this.data?.furColor, Validators.required],
            lastWeight: [this.data?.lastWeight, Validators.required],
            photoUrl: [
                this.data?.photoUrl,
                [
                    Validators.pattern(
                        /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i
                    ),
                ],
            ],
        });
    }

    save(): void {
        // Do nothing if the form is invalid
        if (this.mascotaForm.invalid) {
            return;
        }

        this.mascotaForm.disable();

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
                    this.petId = res.id;
                    this.mascotaForm.enable();
                });
        } else {
            this.mascotasService
                .updatePet(this.petId, this.mascotaForm.value)
                .subscribe((res) => {
                    this._snackBar.open(
                        'Informacion de la mascota actualizada.',
                        'OK',
                        {
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            duration: 5000,
                            panelClass: ['bg-white', 'text-black'],
                        }
                    );
                    this.mascotaForm.enable();
                });
        }
    }
}
