import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MedicoPersona } from 'app/shared/interfaces';
import { SharedService } from 'app/shared/shared.service';
import { MedicosService } from '../../services/medicos.service';
import { FormMedicosComponent } from '../form-medicos/form-medicos.component';

@Component({
    selector: 'app-list-medicos',
    templateUrl: './list-medicos.component.html',
    styleUrls: ['./list-medicos.component.scss'],
})
export class ListMedicosComponent implements OnInit {
    medicos: any[] = [];
    isLoading = true;

    constructor(
        private medicosService: MedicosService,
        private matDialog: MatDialog,
        private fuseConfirmationService: FuseConfirmationService,
        private sharedService: SharedService
    ) {
        this.getMedicosList();
    }

    openNewMedicoModal(): void {
        this.matDialog
            .open(FormMedicosComponent, {
                disableClose: true,
                panelClass: ['w-full', 'md:w-2/4', 'lg:w-2/5', 'xl:w-1/4'],
            })
            .afterClosed()
            .subscribe((res) => {
                this.getMedicosList();
            });
    }

    openUpdateMedicoModal(medico: MedicoPersona): void {
        this.matDialog
            .open(FormMedicosComponent, {
                disableClose: true,
                panelClass: ['w-full', 'md:w-2/4', 'lg:w-2/5', 'xl:w-1/4'],
                data: medico,
            })
            .afterClosed()
            .subscribe((res) => {
                this.getMedicosList();
            });
    }

    ngOnInit(): void {}

    getMedicosList(): void {
        this.isLoading = true;
        this.medicosService.getAllMedicos().subscribe((medicos) => {
            this.isLoading = false;
            this.medicos = medicos;
        });
    }

    deleteDoctorById(doctorId: string): void {
        this.fuseConfirmationService
            .open({
                title: 'alerts.you_sure_delete_label',
                message: 'alerts.you_sure_delete_message',
                actions: {
                    confirm: {
                        color: 'warn',
                        label: 'buttons.yes',
                        show: true,
                    },
                    cancel: {
                        label: 'buttons.no',
                        show: true,
                    },
                },
                dismissible: false,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res === 'confirmed') {
                    this.isLoading = true;
                    this.medicosService.deleteDoctor(doctorId).subscribe(
                        () => {
                            this.isLoading = false;
                            this.getMedicosList();
                            this.sharedService.showAlert('alerts.delete_ok');
                        },
                        () => {
                            this.isLoading = false;
                            this.sharedService.showAlert('alerts.delete_error');
                        }
                    );
                }
            });
    }
}
