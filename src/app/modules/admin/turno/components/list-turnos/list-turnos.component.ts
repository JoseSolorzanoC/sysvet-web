import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SharedService } from 'app/shared/shared.service';
import moment from 'moment';
import { TurnosService } from '../../services/turnos.service';
import { FormTurnosComponent } from '../form-turnos/form-turnos.component';

@Component({
    selector: 'app-list-turnos',
    templateUrl: './list-turnos.component.html',
    styleUrls: ['./list-turnos.component.scss'],
})
export class ListTurnosComponent implements OnInit {
    turnos: any[] = [];
    isLoading = true;

    constructor(
        private turnosService: TurnosService,
        private matDialog: MatDialog,
        private fuseConfirmationService: FuseConfirmationService,
        private sharedService: SharedService
    ) {
        this.getTurnosList();
    }

    openNewTurnoModal(): void {
        this.matDialog
            .open(FormTurnosComponent, {
                disableClose: true,
                panelClass: ['w-full', 'md:w-2/4', 'lg:w-2/5', 'xl:w-1/4'],
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.getTurnosList();
                }
            });
    }

    parseDate(date: any): string {
        return moment(date).format('DD-MM-YYYY');
    }

    ngOnInit(): void {}

    getTurnosList(): void {
        this.isLoading = true;
        this.turnosService.getAllTurnosByUser().subscribe((turnos) => {
            this.isLoading = false;
            this.turnos = turnos;
        });
    }

    cancelTurnoById(turnoId: string): void {
        this.fuseConfirmationService
            .open({
                title: 'alerts.you_sure_delete_label',
                message: 'alerts.you_sure_cancel_message',
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
                    this.turnosService.cancelTurno(turnoId).subscribe(
                        () => {
                            this.isLoading = false;
                            this.getTurnosList();
                            this.sharedService.showAlert(
                                'alerts.turno_cancel_ok'
                            );
                        },
                        () => {
                            this.isLoading = false;
                            this.sharedService.showAlert(
                                'alerts.turno_cancel_error'
                            );
                        }
                    );
                }
            });
    }
}
