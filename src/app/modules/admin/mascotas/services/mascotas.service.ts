import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MascotasService {
    constructor(private httpClient: HttpClient) {}

    getAllPetsByUser(): Observable<any[]> {
        const url = `${environment.apiUrl}/pets/all`;
        return this.httpClient.get<any[]>(url);
    }

    getAllRaces(): Observable<any[]> {
        const url = `${environment.apiUrl}/maintenance/pet-races`;
        return this.httpClient.get<any[]>(url);
    }

    getAllSpecies(): Observable<any[]> {
        const url = `${environment.apiUrl}/maintenance/pet-species`;
        return this.httpClient.get<any[]>(url);
    }

    savePet(pet: any): Observable<any> {
        const url = `${environment.apiUrl}/pets/new`;
        return this.httpClient.post<any>(url, pet);
    }

    updatePet(id: string, pet: any): Observable<any> {
        const url = `${environment.apiUrl}/pets/update/${id}`;
        return this.httpClient.put<any>(url, pet);
    }

    getPetById(id: string): Observable<any> {
        const url = `${environment.apiUrl}/pets/${id}`;
        return this.httpClient.get<any>(url);
    }

    deletePetById(id: string): Observable<any> {
        const url = `${environment.apiUrl}/pets/delete/${id}`;
        return this.httpClient.delete<any>(url);
    }
}
