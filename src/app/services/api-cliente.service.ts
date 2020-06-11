import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiClienteService {
  url = 'https://localhost:44379/api/';
  constructor(private http: HttpClient) {}

  getClientes() {
    return this.http.get<Response>(`${this.url}cliente`);
  }

  addCliente(cliente: Cliente): Observable<Response> {
    return this.http.post<Response>(`${this.url}cliente`, cliente, httpOptions);
  }

  editCliente(cliente: Cliente): Observable<Response> {
    return this.http.put<Response>(`${this.url}cliente`, cliente, httpOptions);
  }
  deleteCliente(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.url}cliente/${id}`);
  }
}
