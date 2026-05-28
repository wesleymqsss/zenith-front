import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CriarMissaoPayload,
  HistoricoMissao,
  MissaoResponse,
} from '../interface/missoes';
import { MessageResponse } from '../interface/messageResponse';
import { ApiResponsePagina } from '../interface/respostaPaginada';

@Injectable({
  providedIn: 'root',
})
export class MissoesService {
  private url = `${environment.api_url}Missoes/`;
  constructor(private readonly _http: HttpClient) { }

  getMissoes(): Observable<MissaoResponse[]> {
    return this._http.get<MissaoResponse[]>(`${this.url}filtrar`);
  }

  getMissoesPorUsuario(idUsuario: number, tipoUsuario: 'criador' | 'aventureiro'): Observable<MissaoResponse[]> {
    const param = tipoUsuario === 'criador' ? 'idCriador' : 'idAventureiro';
    const params = new HttpParams().set(param, idUsuario.toString());
    return this._http.get<MissaoResponse[]>(`${this.url}filtrar`, { params });
  }

  aceitarMissao(id: number): Observable<MessageResponse> {
    const payload = {
      status: "Em andamento",
    }

    return this._http.post<MessageResponse>(`${this.url}${id}/aceitar`, payload);
  }
  
  concluirMissao(id: number): Observable<MessageResponse> {
    const payload = {
      status: "Concluída",
    }

    return this._http.post<MessageResponse>(`${this.url}${id}/aceitar`, payload);
  }

  cancelarMissao(id: number): Observable<MessageResponse> {
    const payload = {
      status: "Cancelada",
    }

    return this._http.post<MessageResponse>(`${this.url}${id}/aceitar`, payload);
  }

  historicoMissoes(
    id: number,
    page: number = 1,
    pageSize: number = 10,
  ): Observable<ApiResponsePagina<HistoricoMissao>> {
    const url = `http://localhost:5068/api/usuarios/${id}/historico`;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this._http.get<ApiResponsePagina<HistoricoMissao>>(url, {
      params: params,
    });
  }

  historicoMissoesCompleto(id: number): Observable<HistoricoMissao[]> {
    const url = `http://localhost:5068/api/usuarios/${id}/historico`;
    const pageSizeMuitoGrande = 99999;

    let params = new HttpParams()
      .set('page', '1')
      .set('pageSize', pageSizeMuitoGrande.toString());

    return this._http
      .get<ApiResponsePagina<HistoricoMissao>>(url, { params: params })
      .pipe(
        map((respostaPaginada) => {
          return respostaPaginada.items;
        }),
      );
  }

  criarMissao(body: CriarMissaoPayload): Observable<MissaoResponse> {
    return this._http.post<MissaoResponse>(`${this.url}`, body);
  }

  getMissaoId(id: number): Observable<MissaoResponse> {
    return this._http.get<MissaoResponse>(`${this.url}${id}`);
  }

  atualizarMissao(id: number, body: MissaoResponse): Observable<any> {
    return this._http.put<any>(`${this.url}atualizar-${id}`, body);
  }

  deletarMissao(id: number): Observable<any> {
    return this._http.delete(`${this.url}${id}`);
  }
}
