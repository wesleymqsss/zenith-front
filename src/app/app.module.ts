import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { LoginModule } from './pages/login/login.module';
import { Noir } from '../styles';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/service/auth.interceptor';
import { MinhasMissoesModule } from './pages/minhas-missoes/minhas-missoes.module';
import { ListaComunidadeModule } from './pages/lista-comunidade/lista-comunidade.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    ListaComunidadeModule,
    MinhasMissoesModule,
    ToastModule,
    ButtonModule,
    LoginModule,
  ],
  exports: [
    BrowserModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    providePrimeNG({
      ripple: true,
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    }),
    provideAnimations(),
    MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
