import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    console.log('[AuthInterceptor] Interceptor executado para:', request.url);

    if (typeof localStorage === 'undefined') {
      console.warn('[AuthInterceptor] localStorage não está disponível.');
      return next.handle(request);
    }

    const storageItem = localStorage.getItem('currentUserAppDoAmor');

    if (!storageItem) {
      console.warn('[AuthInterceptor] Nenhum item "currentUserAppDoAmor" encontrado no localStorage.');
      return next.handle(request);
    }

    try {
      const userData = JSON.parse(storageItem);
      const token = userData?.token; 

      if (token) {
        console.log('[AuthInterceptor] Token ADICIONADO com sucesso.');
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(authReq);

      } else {
        console.warn('[AuthInterceptor] Item encontrado, mas sem a propriedade "token".');
        return next.handle(request);
      }

    } catch (error) {
      console.error('[AuthInterceptor] Erro ao fazer parse do usuário no localStorage', error);
      return next.handle(request);
    }
  }
}
