export class Usuario {
    correo!:number;
    password!: string;
  }
  export class UsuarioUpdate {
    correo!:number;
    passwordAntiguo!: string;
    passwordNuevo!: string;
  }
  export class UsuarioResponse {
    mensaje!: string;
  }
  export class LoginUsuarioResponse {
    mensaje: string ='';
    token: string=''
  }
  