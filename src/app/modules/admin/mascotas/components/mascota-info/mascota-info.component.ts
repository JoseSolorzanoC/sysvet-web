import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { MascotasService } from '../../services/mascotas.service';
import { Pet } from '../interfaces/mascotas.interface';

@Component({
    selector: 'app-mascota-info',
    templateUrl: './mascota-info.component.html',
    styleUrls: ['./mascota-info.component.scss'],
})
export class MascotaInfoComponent implements OnInit {
    petId: string;
    pet: Pet;
    constructor(
        private _mascotaService: MascotasService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.petId = this.route.snapshot.paramMap.get('id');
        if (this.petId) {
            this._mascotaService.getPetById(this.petId).subscribe((res) => {
                this.pet = res;
                this.pet.clinicalConsultations =
                    this.pet.clinicalConsultations.slice(0, 5);
            });
        }
    }

    openPrintSaveView(): void {
        window.print();
    }

    parseDate(date: any): string {
        return moment(date).format('DD-MM-YYYY');
    }
}
