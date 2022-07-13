import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAutenticadosComponent } from './autenticados/list-autenticados/list-autenticados.component';
import { CheckLoginGuard } from './guards/CheckLoginGuard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ListUsuarioComponent } from './usuario/list-usuario/list-usuario.component';
import { LoginComponent } from './usuario/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'registrar-usuario', component: LoginComponent,canActivate: [CheckLoginGuard]},
  {path: 'editar-usuario/:correo', component: LoginComponent,canActivate: [CheckLoginGuard]},
  {path: 'list-usuarios', component: ListUsuarioComponent,canActivate: [CheckLoginGuard]},
  {path: 'menu', component: SidenavComponent, canActivate: [CheckLoginGuard]},
  {path: 'list-Autenticado', component: ListAutenticadosComponent,canActivate: [CheckLoginGuard]},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
