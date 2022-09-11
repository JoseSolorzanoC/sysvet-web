import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
        private matDialog: MatDialog
    ) {
        this.getPetsList();
    }

    openNewMedicoModal(): void {
        this.matDialog
            .open(FormMedicosComponent, {
                disableClose: true,
                panelClass: ['w-full', 'md:w-2/4', 'lg:w-2/5', 'xl:w-1/4'],
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.getPetsList();
                }
            });
    }

    ngOnInit(): void {}

    getPetsList(): void {
        this.isLoading = true;
        this.medicosService.getAllMedicos().subscribe((medicos) => {
            this.isLoading = false;
            this.medicos = medicos;
        });
    }
}
