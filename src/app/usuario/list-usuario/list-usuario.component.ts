import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensajesModule } from 'src/app/mensajes/mensajes.module';
import { Location } from '@angular/common';
import { Usuario } from '../Usuario';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit,OnDestroy {

  suscription!: Subscription;
  usuarios!: Usuario[];
  displayedColumns: string[] = [
    'correo',
    'password',
    'options'];
    dataSource = new MatTableDataSource<Usuario>(this.usuarios);
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  constructor(private usuarioService: EmployeeService, private location: Location, private mensaje: MensajesModule) {
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
   this.ConsultarUsuarios();
    this.suscription = this.usuarioService.refresh$.subscribe(() => {
      this.ConsultarUsuarios();
    });
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ConsultarUsuarios() {
    this.dataSource.data = this.usuariostemp;
    /*this.usuarioService.getUSuarios()
      .subscribe(usuarios => this.dataSource.data = usuarios,
        error => this.mensaje.mensajeAlertaError(error.error.toString()));*/
  }
  goBack():void{
    this.location.back();
  }
  delete(correo: string) {
    this.mensaje.mensajeAlertaCorrecto("El usuario pronto sera borrado");
    /*this.usuarioService.delete(correo)
    .subscribe(nit => this.mensaje.mensajeAlertaCorrecto(nit.mensaje),
        error => this.mensaje.mensajeAlertaError( error.error.toString()));*/
  }
  usuariostemp: Usuario[] = [
    {
      correo: 1,
      password: "HOLA",
    },
    {
      correo: 2,
      password: "CARE",
    },
    {
      correo: 3,
      password: "COLA",
    },
  ];

}
