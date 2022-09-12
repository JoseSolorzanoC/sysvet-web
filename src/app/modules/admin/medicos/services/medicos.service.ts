import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicoPersona, User } from 'app/shared/interfaces';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MedicosService {
    constructor(private _httpClient: HttpClient) {}

    getAllMedicos(): Observable<MedicoPersona[]> {
        const url = `${environment.apiUrl}/users/doctors`;
        return this._httpClient.get<any[]>(url);
    }

    signUpDoctor(user: any): Observable<User> {
        const url = `${environment.apiUrl}/auth/signup/doctor`;
        return this._httpClient.post<any>(url, user);
    }

    updateDoctor(user: any): Observable<User> {
        const url = `${environment.apiUrl}/auth/update/doctor`;
        return this._httpClient.put<any>(url, user);
    }

    deleteDoctor(doctorId: string): Observable<User> {
        const url = `${environment.apiUrl}/auth/delete/doctor/${doctorId}`;
        return this._httpClient.delete<User>(url);
    }
}
