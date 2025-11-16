import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Tarjeta {
  // Backend base URL (use the backend port, not the frontend dev server)
  myAppUrl = 'http://localhost:5230';
  // Controller route is `api/Tarjeta` (TarjetaController -> 'Tarjeta')
  myApiUrl = 'api/Tarjeta';
  constructor(private http: HttpClient) { }

    getListTarjetas(): Observable<any> {
      const url = `${this.myAppUrl}/${this.myApiUrl}`;
      console.debug('[Tarjeta service] GET', url);
      return this.http.get(url);
  }

  deleteTarjeta(id: number): Observable<any> {
    const url = `${this.myAppUrl}/${this.myApiUrl}/${id}`;
    console.debug('[Tarjeta service] DELETE', url);
    return this.http.delete(url);
  }

  saveTarjeta(tarjeta: any): Observable<HttpResponse<any>> {
   const url = `${this.myAppUrl}/${this.myApiUrl}`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(url, tarjeta, { headers, observe: 'response' });

  }

  updateTarjeta(id: number, tarjeta: any): Observable<HttpResponse<any>> {
  const url = `${this.myAppUrl}/${this.myApiUrl}/${id}`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put<any>(url, tarjeta, { headers, observe: 'response' });
}
}
