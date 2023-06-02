import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensajesModule } from 'src/app/mensajes/mensajes.module';
import { Usuario, UsuarioResponse, UsuarioUpdate } from '../User';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';
import { Employee } from '../Employee';
import { EmployeeView } from '../EmployeeView';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit,OnDestroy {
  tipoempleado:string[]= [
    'Administrador',
    'Operador'
  ];
  
  
  modoCrear: boolean = false;
  modoEditar: boolean = false;
  idUpdate!:string;
  usuarioResponse!: UsuarioResponse;
  formGroup = this.fb.group({
    id:[0],
    firstName:['',[Validators.required, Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/), Validators.minLength(2), Validators.maxLength(20)]],
    cc: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^([0-9])*$/)]],
    secondName:['',[Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/), Validators.minLength(2), Validators.maxLength(20)]],
    lastName:['',[Validators.required]],
    secondLastName:['',[Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/), Validators.minLength(2), Validators.maxLength(20)]],
    mail: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^([0-9])*$/)]],
    password: ['', Validators.required],
    active: [true],
    typeId: ['',Validators.required]
  });
  hide = true;
  private subscription: Subscription;
  constructor(private employeeService: EmployeeService, private router: Router, private fb: FormBuilder
    ,private mensaje : MensajesModule, private activatedRoute: ActivatedRoute, private location: Location) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    console.log("EDITAR");
    this.activatedRoute.params.subscribe(params => {

      if (params["id"] == undefined) {
       this.modoEditar= false;
        return;
      }
      this.idUpdate = params["id"];
      this.modoEditar= true;
      
     this.employeeService.getEmployeeById(this.idUpdate)
        .subscribe(employee => this.loadForm(employee),
          error => this.mensaje.mensajeAlertaError("Lo sentimos, no se pudo encontrar el empleado."));
    });
    const segments: UrlSegment[] = this.activatedRoute.snapshot.url;
  
    if (segments[0].toString().match('add-employee')){
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
  loadForm(employee: EmployeeView) {
    this.formGroup.patchValue({
      id: employee.id,
      cc: employee.cc,
      mail: employee.mail,
      firstName: employee.firstName,
      secondName: employee.secondName,
      lastName: employee.lastName,
      secondLastName: employee.secondLastName,
      phone: employee.phone,
      typeId:employee.typeId
    });

  }
 onEdit():void{
  let usuario: Employee = Object.assign({}, this.formGroup.value);
  if (this.formGroup.valid && this.modoEditar){
    this.mensaje.mensajeAlertaError("valido")
      this.employeeService.updateEmployee(usuario)
        .subscribe(rta => this.onSuccess("update","Empleado modificado exitosamente."),
          error => this.mensaje.mensajeAlertaError("Lo sentimos, no se pudo modificar el empleado."));
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
      this.employeeService.postEmployee(employee)
        .subscribe(rta => this.onSuccess("add", "Empleado registrado con exito"),
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
    this.router.navigate(["/home"]);
    }
    else if(rta.match("add")){
       this.goBack();
    }
    else if(rta.match("update")){
      this.goBack();
   }
   }
}
