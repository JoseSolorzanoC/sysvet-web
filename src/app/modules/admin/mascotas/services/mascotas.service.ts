import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetRace, PetSpecie } from 'app/shared/interfaces';
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

    getAllRaces(): Observable<PetRace[]> {
        const url = `${environment.apiUrl}/maintenance/pet-races`;
        return this.httpClient.get<any[]>(url);
    }

    getAllSpecies(): Observable<PetSpecie[]> {
        const url = `${environment.apiUrl}/maintenance/pet-species`;
        return this.httpClient.get<any[]>(url);
    }

    savePet(pet: any, file: File): Observable<any> {
        const formData = new FormData();
        if (file) {
            formData.append('file', file, file.name);
        }
        formData.append('specieId', pet.specieId);
        formData.append('name', pet.name);
        formData.append('birthDate', pet.birthDate);
        formData.append('furColor', pet.furColor);
        formData.append('lastWeight', pet.lastWeight);
        formData.append('raceId', pet.raceId);

        const url = `${environment.apiUrl}/pets/new`;
        return this.httpClient.post<any>(url, formData);
    }

    updatePet(id: string, pet: any, file: File): Observable<any> {
        const formData = new FormData();
        if (file) {
            formData.append('file', file, file.name);
        } else {
            formData.append('photoUrl', pet.photoUrl);
        }
        formData.append('specieId', pet.specieId);
        formData.append('name', pet.name);
        formData.append('birthDate', pet.birthDate);
        formData.append('furColor', pet.furColor);
        formData.append('lastWeight', pet.lastWeight);
        formData.append('raceId', pet.raceId);

        const url = `${environment.apiUrl}/pets/update/${id}`;
        return this.httpClient.put<any>(url, formData);
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
