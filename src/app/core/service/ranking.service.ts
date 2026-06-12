import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { RankingGrupo } from '../interface/rankingGrupo';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private url = `${environment.api_url}rankings/`;

  constructor(private readonly _http: HttpClient) { }

  getRankingGrupos(take: number = 10): Observable<RankingGrupo[]> {
    return this._http.get<RankingGrupo[]>(`${this.url}grupos?take=${take}`);
  }
}
