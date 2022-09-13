import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaClinicaService } from '../../services/consulta-clinica.service';

@Component({
    selector: 'app-list-consulta-clinica',
    templateUrl: './list-consulta-clinica.component.html',
    styleUrls: ['./list-consulta-clinica.component.scss'],
})
export class ListConsultaClinicaComponent implements OnInit {
    consultas: any[] = [];
    isLoading = true;

    constructor(
        private router: Router,
        private consultaServie: ConsultaClinicaService
    ) {}

    ngOnInit(): void {
        this.getConsultasList();
    }

    goToNuevaConsulta(): void {
        this.router.navigate(['consulta-medica/nueva']);
    }

    getConsultasList(): void {
        this.isLoading = true;
        this.consultaServie.getAllActiveConsultas().subscribe((res) => {
            this.isLoading = false;
            this.consultas = res;
        });
    }

    goToSeeConsulta(consultationId: string): void {
        this.router.navigate([`consulta-medica/ver/${consultationId}`]);
    }
}
