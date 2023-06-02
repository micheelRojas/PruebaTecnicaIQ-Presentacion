import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuarioResponse, Usuario, UsuarioResponse, UsuarioUpdate } from './Usuario';
import { tap, catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { EmployeeView } from './EmployeeView';
import { Employee } from './Employee';
const helper = new JwtHelperService();
const urlApi: string = `${environment.baseUrlApi}/Usuario`;


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private _refresh$ = new Subject<void>();
  
  constructor(private httpClient: HttpClient, private router: Router) { }
  get refresh$() {
    return this._refresh$;
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(urlApi + "/employee/" + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })

      );
  }
  
  getEmployees(): Observable<EmployeeView[]> {
    return this.httpClient.get<EmployeeView[]>(urlApi+'/employee');
  }
  getEmployeeById(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(urlApi + '/employee' + id);
  }
  updateEmploye(employee: Employee): Observable<EmployeeView> {
    return this.httpClient.put<EmployeeView>(urlApi+'/employee', employee);
  }
  postEmployee(employee: Employee): Observable<EmployeeView>  {
    
    return this.httpClient.post<EmployeeView>(urlApi+'/employee', employee);
  }

 /* onlogin(usuario: Usuario): Observable<LoginUsuarioResponse | void> {
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
  }*/
}
