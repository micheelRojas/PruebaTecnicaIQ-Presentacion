import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './guards/CheckLoginGuard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { EmployeeComponent } from './user/employee/employee.component';
import { LisEmployeeComponent } from './user/list-employee/list-employee.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  //{path: 'login', component: LoginComponent},
  {path: 'add-employee', component: EmployeeComponent},//canActivate: [CheckLoginGuard]},
  {path: 'edit-employee/:id', component: EmployeeComponent},//canActivate: [CheckLoginGuard]},
  {path: 'list-employees', component: LisEmployeeComponent},//canActivate: [CheckLoginGuard]},
  {path: 'home', component: SidenavComponent},//, canActivate: [CheckLoginGuard]},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
