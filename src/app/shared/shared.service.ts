import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor(private httpClient: HttpClient) {}

    getCurrentUser(): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/users/me`);
    }

    getAllDocumentTypes(): Observable<DocumentType[]> {
        return this.httpClient.get<DocumentType[]>(
            `${environment.apiUrl}/maintenance/document-types`
        );
    }
}
