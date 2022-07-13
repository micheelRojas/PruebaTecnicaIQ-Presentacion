import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autenticado } from './Autenticado';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoService {
  constructor(private httpClient: HttpClient) { }
  
  getAutenticados(): Observable<Autenticado[]> {
    const urlApi = `${environment.baseUrlApi}/Autenticado`;
    return this.httpClient.get<Autenticado[]>(urlApi);
  }
}
