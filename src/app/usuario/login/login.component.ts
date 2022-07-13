import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensajesModule } from 'src/app/mensajes/mensajes.module';
import { Usuario, UsuarioResponse, UsuarioUpdate } from '../Usuario';
import { UsuarioService } from '../usuario.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  modoCrear: boolean = false;
  modoEditar: boolean = false;
  correo!:string;
  usuarioResponse!: UsuarioResponse;
  formGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordNuevo: [''],
  });
  hide = true;
  private subscription: Subscription;
  constructor(private usuarioService: UsuarioService, private router: Router, private fb: FormBuilder
    ,private mensaje : MensajesModule, private activatedRoute: ActivatedRoute, private location: Location) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      if (params["correo"] == undefined) {
       this.modoEditar= false;
        return;
      }
      this.correo = params["correo"];
      this.modoEditar= true;
      this.usuarioService.getUsuarioByCorreo(this.correo)
        .subscribe(usuario => this.cargarFormulario(usuario),
          error => this.mensaje.mensajeAlertaError(error.error.toString()));
     
    });
    const segments: UrlSegment[] = this.activatedRoute.snapshot.url;
  
    if (segments[0].toString().match('registrar-usuario')){
      this.modoCrear = true;
      this.modoEditar= false;
      console.log(this.modoCrear);
      console.log("Registando");
    }
     if(segments[0].toString().match('login')){
      this.modoCrear = false;
      this.modoEditar= false;
      console.log(this.modoCrear);
      console.log("logear");
    }
    
  }
  cargarFormulario(usuario: Usuario) {
    this.formGroup.patchValue({
      correo: usuario.correo,
    });
  }
 onEdit():void{
  let usuario: UsuarioUpdate = Object.assign({}, this.formGroup.value);
  usuario.passwordAntiguo =  this.formGroup.value.password;
  if (this.formGroup.valid && this.modoEditar){
      this.usuarioService.updateUsuario(usuario)
        .subscribe(rta => this.onSuccess(rta.mensaje),
          error => this.mensaje.mensajeAlertaError(error.error.toString()));
    } else {
      this.mensaje.mensajeAlertaError('Edicion no valida');
    
  }
 }
  onLogin(): void {
    const formValue = this.formGroup.value;
    if (this.formGroup.valid && !this.modoCrear ){
      this.subscription.add(
        this.usuarioService.onlogin(formValue).subscribe((res) =>{
          if (res ){
            console.log(res)
            this.onSuccess(res.mensaje)
          }
        }) ); 
    }
    else{
      this.mensaje.mensajeAlertaError("Formulario Invalido")
    }
  }

  onSave(){
    let usuario: Usuario = Object.assign({}, this.formGroup.value);
    if (this.formGroup.valid && this.modoCrear) {
      this.usuarioService.post(usuario)
        .subscribe(rta => this.onSuccess(rta.mensaje),
          error => this.mensaje.mensajeAlertaError( error.error.toString()));
    } else {
      this.mensaje.mensajeAlertaError('El formGroup del Usuario no es valido');
    }
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void{
    this.location.back()
  }

  onSuccess(rta: string) {
    this.mensaje.mensajeAlertaCorrecto(rta);
    if (rta.match("Usuario y Contraseña Correctos.")){
    this.router.navigate(["/menu"]);
    }
    else if(rta.match("Usuario Creado Exitosamente.")){
       this.goBack();
    }
    else if(rta.match("Usuario Actualizado Exitosamente.")){
      this.goBack();
   }
   }
}
