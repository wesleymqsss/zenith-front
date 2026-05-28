import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails, Usuario } from '../interface/usuario';
import { ApiResponsePagina } from '../interface/respostaPaginada';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private url = `${environment.api_url}Usuarios`

  constructor(private http: HttpClient) { }

  getUserDetails(userId: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.url}/` + userId)
  }

  userDetailsUpdate(id: string, responseBody: any): Observable<any> {
    const urlId = `${this.url}/${id}`
    return this.http.put<any>(urlId, responseBody);
  }

  createUser(responseBody: any): Observable<any>{
    return this.http.post<any>(`${this.url}`, responseBody);
  }

  getUserForProfile(profile: number): Observable<UserDetails[]>{
    return this.http.get<UserDetails[]>(`${this.url}/por-tipo-perfil/${profile}`);
  }

  getUsers(): Observable<ApiResponsePagina<Usuario>>{
    return this.http.get<ApiResponsePagina<Usuario>>(this.url);
  }
}
