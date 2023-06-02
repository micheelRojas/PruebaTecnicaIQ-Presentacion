import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './Material.Module';
import { MensajesModule } from './mensajes/mensajes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { SidenavComponent } from './sidenav/sidenav.component';
import { CheckLoginGuard } from './guards/CheckLoginGuard';
import { EmployeeComponent } from './user/employee/employee.component';
import { LisEmployeeComponent } from './user/list-employee/list-employee.component';
import { JwtIntercerptorInterceptor } from './user/jwt-intercerptor.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    SidenavComponent,
    LisEmployeeComponent,

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
