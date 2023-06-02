import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { EmployeeService } from '../usuario/employee.service';
@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authService: EmployeeService, private router:Router) { }
  //puede acceder un usuario a tal ruta?
  canActivate(): boolean{
    /* if (this.authService.getToken()){
        return true;
     }
     this.router.navigate(['']);
     return false;*/
     return true;
  }
}
  
