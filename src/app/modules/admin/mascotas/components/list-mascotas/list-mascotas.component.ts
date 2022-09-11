import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { MascotasService } from '../../services/mascotas.service';
import { FormMascotasComponent } from '../form-mascotas/form-mascotas.component';

@Component({
    selector: 'app-list-mascotas',
    templateUrl: './list-mascotas.component.html',
    styleUrls: ['./list-mascotas.component.scss'],
})
export class ListMascotasComponent implements OnInit {
    pets: any[] = [];
    isLoading = false;

    constructor(
        private mascotasService: MascotasService,
        private matDialog: MatDialog
    ) {
        this.getPetsList();
    }

    openNewPetModal(): void {
        this.matDialog
            .open(FormMascotasComponent, {
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

    getAge(birthDate: Date): string {
        return moment(birthDate).fromNow();
    }

    getPetsList(): void {
        this.isLoading = true;
        this.mascotasService.getAllPetsByUser().subscribe((res) => {
            this.isLoading = false;
            this.pets = res;
        });
    }
}
