import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SharedService } from 'app/shared/shared.service';
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
        private matDialog: MatDialog,
        private fuseConfirmationService: FuseConfirmationService,
        private sharedService: SharedService
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

    openUpdatePetModal(pet: any): void {
        this.matDialog
            .open(FormMascotasComponent, {
                disableClose: true,
                panelClass: ['w-full', 'md:w-2/4', 'lg:w-2/5', 'xl:w-1/4'],
                data: pet,
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

    deletePetById(petId: string): void {
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
                    this.mascotasService.deletePetById(petId).subscribe(
                        () => {
                            this.isLoading = false;
                            this.getPetsList();
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
