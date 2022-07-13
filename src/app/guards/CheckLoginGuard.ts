import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { take, map } from 'rxjs/operators';
import { Usuario } from '../usuario/Usuario';
import { UsuarioService } from '../usuario/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authService: UsuarioService, private router:Router) { }
  //puede acceder un usuario a tal ruta?
  canActivate(): boolean{
     if (this.authService.getToken()){
        return true;
     }
     this.router.navigate(['']);
     return false;
  }
}
  
