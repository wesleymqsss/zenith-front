import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoMissaoService {
  private url = `${environment.api_url}avaliacoes`;

  constructor(private readonly _http: HttpClient) { }

  avalicaoMissao(payloadAvaliacao: any): Observable<any> {
    return this._http.post<any>(`${this.url}`, payloadAvaliacao);
  }
}
