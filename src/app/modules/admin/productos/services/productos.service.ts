import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductosService {
    constructor(private _httpClient: HttpClient) {}

    getAllProductos(): Observable<any[]> {
        const url = `${environment.apiUrl}/products/all`;
        return this._httpClient.get<any[]>(url);
    }

    saveProducto(producto: any): Observable<any> {
        const url = `${environment.apiUrl}/products/new`;
        return this._httpClient.post<any[]>(url, producto);
    }

    updateProducto(productId: string, producto: any): Observable<any> {
        const url = `${environment.apiUrl}/products/update/${productId}`;
        return this._httpClient.put<any[]>(url, producto);
    }

    deleteProducto(productId: string): Observable<any> {
        const url = `${environment.apiUrl}/products/delete/${productId}`;
        return this._httpClient.delete<any>(url);
    }
}
