import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ConvidarGrupoRequest, GrupoRequest } from '../interface/grupoRequest';
import { GrupoResponse, MembroGrupoResponse } from '../interface/grupoResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private url = `${environment.api_url}Grupos`;

  constructor(private readonly _http: HttpClient) { }

  criarGrupo(payloadGrupo: GrupoRequest):Observable <GrupoResponse> {
    return this._http.post<GrupoResponse>(`${this.url}`, payloadGrupo);
  }

  getGrupos(): Observable<GrupoResponse[]> {
    return this._http.get<GrupoResponse[]>(`${this.url}`);
  }
  
  convidarParaGrupo(idGrupo: number, payloadConvidarGrupo: ConvidarGrupoRequest): Observable<any> {
    return this._http.post(`${this.url}/${idGrupo}/membros`, payloadConvidarGrupo);
  }
  
  visualizarMembrosGrupo(idGrupo: number): Observable<MembroGrupoResponse[]> {
    return this._http.get<MembroGrupoResponse[]>(`${this.url}/${idGrupo}/membros`);
  }
}
