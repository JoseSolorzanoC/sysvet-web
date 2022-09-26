import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private _httpClient: HttpClient) {}

    updateProfile(updateData: any): Observable<any> {
        const url = `${environment.apiUrl}/users/update-profile`;
        return this._httpClient.put(url, updateData);
    }
}
