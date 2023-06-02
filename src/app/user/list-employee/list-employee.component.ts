import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensajesModule } from 'src/app/mensajes/mensajes.module';
import { Location } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { EmployeeView } from '../EmployeeView';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class LisEmployeeComponent implements OnInit,OnDestroy {

  suscription!: Subscription;
  empleados!: EmployeeView[];
  displayedColumns: string[] = [
    'id',
    'cc',
    'mail',
    'firstName',
    'secondName',
    'lastName',
    'secondLastName',
    'phone',
    'typeId',
    'options'];
    dataSource = new MatTableDataSource<EmployeeView>(this.empleados);
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  constructor(private employeeService: EmployeeService, private location: Location,
     private mensaje: MensajesModule,private router: Router) {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
   this.GetEmployees();
   this.suscription = this.employeeService.refresh$.subscribe(() => {
      this.GetEmployees();
    });
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  
  GetEmployees() {
   this.employeeService.getEmployees()
      .subscribe(employees => this.dataSource.data = employees,
        error => this.mensaje.mensajeAlertaError("Error al conultar los empleados."));
      }

  
  goBack():void{
    this.location.back();
  }
  delete(id: string) {
    this.employeeService.delete(id)
    .subscribe(nit => this.mensaje.mensajeAlertaCorrecto("Empleado eliminado exitosamente."),
        error => this.mensaje.mensajeAlertaError( "Lo sentimos, no se puedo eliminar el empleado."));
  }

  
  usuariostemp: EmployeeView[] = [
    {
    id: 1,
    cc:"1065",
    mail: "HOLA",
    firstName: "HOLA",
    secondName: "HOLA",
    lastName: "HOLA",
    secondLastName: "HOLA",
    phone: "HOLA",
    typeId:1
    },
  ];

}
