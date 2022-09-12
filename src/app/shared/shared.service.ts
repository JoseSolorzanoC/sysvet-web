import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { DocumentType } from './interfaces';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor(
        private httpClient: HttpClient,
        private _snackBar: MatSnackBar,
        private translocoServie: TranslocoService
    ) {}

    getCurrentUser(): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}/users/me`);
    }

    getAllDocumentTypes(): Observable<DocumentType[]> {
        return this.httpClient.get<DocumentType[]>(
            `${environment.apiUrl}/maintenance/document-types`
        );
    }

    showAlert(message: string): void {
        this._snackBar.open(this.translocoServie.translate(message), 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['bg-white', 'text-black'],
        });
    }
}
