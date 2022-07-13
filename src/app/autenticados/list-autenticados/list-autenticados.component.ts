import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensajesModule } from 'src/app/mensajes/mensajes.module';
import { Autenticado } from '../Autenticado';
import { AutenticadoService } from '../autenticado.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-list-autenticados',
  templateUrl: './list-autenticados.component.html',
  styleUrls: ['./list-autenticados.component.css']
})
export class ListAutenticadosComponent implements OnInit {
  suscription!: Subscription;
  autenticados!: Autenticado[];
  displayedColumns: string[] = [
    'correo',
    'fecha',
    'hora'];
    dataSource = new MatTableDataSource<Autenticado>(this.autenticados);
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  constructor(private autenticadoService: AutenticadoService, private location: Location, private mensaje: MensajesModule) {
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
    this.ConsultarAutenticados();
  }
  ConsultarAutenticados() {
    this.autenticadoService.getAutenticados()
      .subscribe(autenticados => this.dataSource.data = autenticados,
        error => this.mensaje.mensajeAlertaError(error.error.toString()));
  }
  goBack():void{
    this.location.back();
  }
}
