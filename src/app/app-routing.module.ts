import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './guards/CheckLoginGuard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ListUsuarioComponent } from './usuario/list-usuario/list-usuario.component';
import { EmployeeComponent } from './usuario/employee/employee.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu'},
  //{path: 'login', component: LoginComponent},
  {path: 'registrar-usuario', component: EmployeeComponent},//canActivate: [CheckLoginGuard]},
  {path: 'editar-usuario/:correo', component: EmployeeComponent},//canActivate: [CheckLoginGuard]},
  {path: 'list-usuarios', component: ListUsuarioComponent},//canActivate: [CheckLoginGuard]},
  {path: 'menu', component: SidenavComponent},//, canActivate: [CheckLoginGuard]},
  //{path: 'list-Autenticado', component: ListAutenticadosComponent,canActivate: [CheckLoginGuard]},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
