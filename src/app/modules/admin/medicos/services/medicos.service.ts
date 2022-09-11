import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MedicosService {
    constructor(private _httpClient: HttpClient) {}

    getAllMedicos(): Observable<any[]> {
        const url = `${environment.apiUrl}/users/doctors`;
        return this._httpClient.get<any[]>(url);
    }

    signUpDoctor(user: any): Observable<any> {
        return this._httpClient.post<any>(
            `${environment.apiUrl}/auth/signup/doctor`,
            user
        );
    }
}
