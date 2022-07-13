import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MensajesModule { 
  mensajeAlertaCorrecto( texto: string) {
    Swal.fire({
      icon: 'success',
      title: "Exitoso",
      text: texto,
    });
  }
  mensajeAlertaError( texto: string) {
    Swal.fire({
      icon: 'error',
      title: "Error",
      text: texto,
    });
  }
}
