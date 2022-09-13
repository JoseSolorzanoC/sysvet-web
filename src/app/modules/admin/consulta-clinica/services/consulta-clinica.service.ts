import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ConsultaClinicaService {
    constructor(private httpClient: HttpClient) {}

    saveConsultaClinica(consulta: any): Observable<any> {
        const url = `${environment.apiUrl}/clinical-consultation/create`;
        return this.httpClient.post<any>(url, consulta);
    }

    getAllActiveConsultas(): Observable<any[]> {
        const url = `${environment.apiUrl}/clinical-consultation/all`;
        return this.httpClient.get<any[]>(url);
    }

    getConsultationById(consultationId: string): Observable<any> {
        const url = `${environment.apiUrl}/clinical-consultation/${consultationId}`;
        return this.httpClient.get<any[]>(url);
    }
}
