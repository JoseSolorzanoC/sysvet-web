import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TurnosService {
    constructor(private _httpClient: HttpClient) {}

    getAllTurnosByUser(): Observable<any[]> {
        const url = `${environment.apiUrl}/appointments/all`;
        return this._httpClient.get<any[]>(url);
    }

    saveTurno(turno: any): Observable<any> {
        const url = `${environment.apiUrl}/appointments/new`;
        return this._httpClient.post<any>(url, turno);
    }
}
