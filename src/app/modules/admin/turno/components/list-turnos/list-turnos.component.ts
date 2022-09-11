import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
        private matDialog: MatDialog
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

    ngOnInit(): void {}

    getTurnosList(): void {
        this.isLoading = true;
        this.turnosService.getAllTurnosByUser().subscribe((turnos) => {
            this.isLoading = false;
            this.turnos = turnos;
        });
    }
}
