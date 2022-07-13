import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuarioResponse, Usuario, UsuarioResponse, UsuarioUpdate } from './Usuario';
import { tap, catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
const helper = new JwtHelperService();
const urlApi: string = `${environment.baseUrlApi}/Usuario`;


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private _refresh$ = new Subject<void>();
  
  constructor(private httpClient: HttpClient, private router: Router) { }
  get refresh$() {
    return this._refresh$;
  }
  delete(correo: string): Observable<UsuarioResponse> {
    return this.httpClient.delete<UsuarioResponse>(urlApi + "/" + correo)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })

      );
  }
  getUSuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(urlApi);
  }
  getUsuarioByCorreo(correo: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(urlApi + '/' + correo);
  }
  updateUsuario(usuario: UsuarioUpdate): Observable<UsuarioResponse> {
    return this.httpClient.put<UsuarioResponse>(urlApi, usuario);
  }
  post(usuario: Usuario): Observable<UsuarioResponse>  {
    
    return this.httpClient.post<UsuarioResponse>(urlApi, usuario);
  }

  onlogin(usuario: Usuario): Observable<LoginUsuarioResponse | void> {
    this.logout();
    return this.httpClient.post<LoginUsuarioResponse>(urlApi+'/Login', usuario)
    .pipe(
      map(res=>{
      const token = res.token;
      console.log('token', token);
      sessionStorage.setItem('token',token);
      localStorage.setItem('token',token);
      return res;
    }),
    catchError(this.handleError));   
  }
  private checkToken(): void {
    const token = localStorage.getItem('token') || null;//<--- si no existe user sera null
    if (token) {
      const isExpired = helper.isTokenExpired(token);//<-el token expiro?
      //si expiro destruir el token 
      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
      }
    }
    //isExpired ?this.logout():this.loggedIn.next(true);
    //console.log('Expiro el Token->', isExpired);
  }
  getToken():string {
    return localStorage.getItem('token')?? '';
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  handleError(err: any):Observable<String | any> {
     if (err){
      alert(err.error);
     }
    return throwError(err.error);
  }
}
