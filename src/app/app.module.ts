import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './usuario/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './Material.Module';
import { MensajesModule } from './mensajes/mensajes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JwtIntercerptorInterceptor } from './usuario/jwt-intercerptor.interceptor';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ListAutenticadosComponent } from './autenticados/list-autenticados/list-autenticados.component';
import { CheckLoginGuard } from './guards/CheckLoginGuard';
import { ListUsuarioComponent } from './usuario/list-usuario/list-usuario.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    ListAutenticadosComponent,
    ListUsuarioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MensajesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [CookieService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:JwtIntercerptorInterceptor,
    multi:true
  }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
