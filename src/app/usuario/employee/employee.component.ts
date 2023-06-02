import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensajesModule } from 'src/app/mensajes/mensajes.module';
import { Usuario, UsuarioResponse, UsuarioUpdate } from '../Usuario';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';
import { Employee } from '../Employee';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit,OnDestroy {
  tipoempleado:string[]= [
    'Administrador',
    'Operador'
  ]
  modoCrear: boolean = false;
  modoEditar: boolean = false;
  correo!:string;
  usuarioResponse!: UsuarioResponse;
  formGroup = this.fb.group({
    nombre1:['',[Validators.required, Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/), Validators.minLength(2), Validators.maxLength(20)]],
    nombre2:['',[Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/), Validators.minLength(2), Validators.maxLength(20)]],
    apellido1:['',[Validators.required]],
    apellido2:['',[Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/), Validators.minLength(2), Validators.maxLength(20)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^([0-9])*$/)]],
    passwordNuevo: [''],
  });
  hide = true;
  private subscription: Subscription;
  constructor(private employeeService: EmployeeService, private router: Router, private fb: FormBuilder
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
      /*this.usuarioService.getUsuarioByCorreo(this.correo)
        .subscribe(usuario => this.cargarFormulario(usuario),
          error => this.mensaje.mensajeAlertaError(error.error.toString()));*/
     
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
      /*this.usuarioService.updateUsuario(usuario)
        .subscribe(rta => this.onSuccess(rta.mensaje),
          error => this.mensaje.mensajeAlertaError(error.error.toString()));*/
    } else {
      this.mensaje.mensajeAlertaError('Edicion no valida');
    
  }
 }
  onLogin(): void {
    /*const formValue = this.formGroup.value;
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
    }*/
  }

  onSave(){
    let employee: Employee = Object.assign({}, this.formGroup.value);
    if (this.formGroup.valid && this.modoCrear) {
      this.mensaje.mensajeAlertaCorrecto('Empleado registrado con exito');
      console.log(employee);
      this.employeeService.postEmployee(employee)
        .subscribe(rta => this.onSuccess("crear", "Empleado Creado exitoso"),
          error => this.mensaje.mensajeAlertaError( error.error.toString())); 
    } else {
      this.mensaje.mensajeAlertaError('El formulario del Empleado no es valido');
    }
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void{
    this.location.back()
  }

  onSuccess(tipo:string,rta: string) {
    this.mensaje.mensajeAlertaCorrecto(rta);
    if (rta.match("Usuario y Contraseña Correctos.")){
    this.router.navigate(["/menu"]);
    }
    else if(rta.match("crear")){
       this.goBack();
    }
    else if(rta.match("Usuario Actualizado Exitosamente.")){
      this.goBack();
   }
   }
}
