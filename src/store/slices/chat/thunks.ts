import { IMensaje } from '../../../interfaces';
import { AppThunk } from '../../store';
import { addMensaje, mensajesLeidos, nuevoMensaje } from './chatSlice';
import { Socket } from 'socket.io-client';

export const onNuevoMensaje = (mensaje: IMensaje, socket: Socket): AppThunk => async (
  dispatch,
  getState) => {

  try{

    const {chatActivo} = getState().chat;
    const {usuario} = getState().auth;


    if(mensaje.de === chatActivo?.uid || mensaje.de === usuario!.uid){

      dispatch(addMensaje(mensaje));
      socket.emit('mensaje-leido', mensaje._id);
    }

    dispatch(nuevoMensaje(mensaje));


    

  } catch (error) {
    console.log(error);
  }


}

// Se recibe el uid del usuario que vio mis mensajes
export const onMensajesLeidos = (uid: string): AppThunk => async (
  dispatch,
  getState) => {

  try{

    const {chatActivo} = getState().chat;
    const {usuario} = getState().auth;


    if(uid === chatActivo?.uid ){

      dispatch(mensajesLeidos(uid));
    }

    // dispatch(nuevoMensaje(mensaje));

  } catch (error) {
    console.log(error);
  }


}
