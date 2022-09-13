import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MascotasService } from 'app/modules/admin/mascotas/services/mascotas.service';
import moment from 'moment';
import { ConsultaClinicaService } from '../../services/consulta-clinica.service';
import { FormItemRecetaComponent } from '../form-item-receta/form-item-receta.component';

@Component({
    selector: 'app-form-consulta-clinica',
    templateUrl: './form-consulta-clinica.component.html',
    styleUrls: ['./form-consulta-clinica.component.scss'],
})
export class FormConsultaClinicaComponent implements OnInit {
    treatmentDisplayedColums: string[] = [
        'productName',
        'posology',
        'totalDose',
    ];
    treatmentDataSource = new MatTableDataSource([]);
    consultaForm: FormGroup;
    consultaData: any;
    pets: any[] = [];
    statusValues = ['Bueno/a', 'Regular', 'Malo/a'];
    consultaSaved = false;
    consultaId: string;

    constructor(
        private mascotasService: MascotasService,
        private _snackBar: MatSnackBar,
        private _fb: FormBuilder,
        private _matDialog: MatDialog,
        private consultaService: ConsultaClinicaService,
        private activatedRoute: ActivatedRoute
    ) {
        this.consultaId = activatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.setConsultaForm();
        this.mascotasService.getAllPetsByUser().subscribe((res) => {
            this.pets = res;
        });

        if (this.consultaId) {
            this.consultaSaved = true;
            this.consultaService
                .getConsultationById(this.consultaId)
                .subscribe((res) => {
                    this.consultaData = res;
                    this.setConsultaForm();
                    this.consultaForm.disable();
                    this.treatmentDataSource.data =
                        this.consultaData.clinicalConsultationTreatment;
                    this.consultaSaved = true;
                });
        } else {
            this.setConsultaForm();
        }
    }

    setConsultaForm(): void {
        this.consultaForm = this._fb.group({
            petId: [this.consultaData?.petId, [Validators.required]],
            reason: [this.consultaData?.reason, [Validators.required]],
            openedDate: [moment(), [Validators.required]],
            anamnesis: [this.consultaData?.anamnesis, [Validators.required]],
            petCf: [this.consultaData?.petCf, [Validators.required]],
            petRf: [this.consultaData?.petRf, [Validators.required]],
            petPulse: [this.consultaData?.petPulse, [Validators.required]],
            petTemperature: [
                this.consultaData?.petTemperature,
                [Validators.required],
            ],
            petConsultationWeight: [
                this.consultaData?.petConsultationWeight,
                [Validators.required],
            ],
            petAttitude: [
                this.consultaData?.petAttitude,
                [Validators.required],
            ],
            petCorporalCondition: [
                this.consultaData?.petCorporalCondition,
                [Validators.required],
            ],
            petHidratationState: [
                this.consultaData?.petHidratationState,
                [Validators.required],
            ],
            clinicalConsultationTreatment: [
                this.consultaData?.clinicalConsultationTreatment ?? [],
            ],
        });
    }

    openAddItemToTreatmentModal(): void {
        this._matDialog
            .open(FormItemRecetaComponent, {
                disableClose: true,
                panelClass: ['w-full', 'sm:w-2/3', 'md:w-1/3', 'lg:w-1/4'],
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this._snackBar.open('Elemento Agregado', 'OK', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 5000,
                        panelClass: ['bg-white', 'text-black'],
                    });
                    (
                        this.consultaForm.controls.clinicalConsultationTreatment
                            .value as any[]
                    ).push(res);
                    this.treatmentDataSource.data =
                        this.consultaForm.controls.clinicalConsultationTreatment.value;
                }
            });
    }

    save(): void {
        if (this.consultaForm.invalid) {
            return;
        }

        this.consultaForm.disable();

        this.consultaService
            .saveConsultaClinica(this.consultaForm.value)
            .subscribe((res) => {
                this.consultaSaved = true;
                this._snackBar.open('Consulta registrada.', 'OK', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 5000,
                    panelClass: ['bg-white', 'text-black'],
                });
            });
    }
}
