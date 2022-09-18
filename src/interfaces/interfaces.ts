

export interface IUsuario{
  uid: string;
  nombre: string;
  email: string;
  online: boolean;
  lastConnection: Date;
  avatar: string;
  mensaje: IMensaje;
  cantidadMensajes: number;
}

export interface IMensaje{
  _id: string;
  de: string;
  para: string;
  mensaje: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'enviado' |'entregado' | 'leido';

}