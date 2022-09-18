import { chatApi } from '../api';
import { cargarMensajes, cargarUsuarios, selectChat, setChatActivo } from '../store/slices/chat';
import { useAppSelector, useAppDispatch } from './useRedux';
import { IUsuario } from '../interfaces/interfaces';
import { useSocket } from './useSocket';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';


export const useChatStore = () => {

  const { chatActivo, mensajes, usuarios } = useAppSelector(state => state.chat);

  const dispatch = useAppDispatch();


  const onLoadMensajes = async () => {

    try {
      const { data } = await chatApi.get(`/mensajes/${chatActivo?.uid}`);
      dispatch(cargarMensajes(data.mensajes));

    } catch (error) {
      console.log(error)
    }

  }


  const onCargarUsuarios = async (usuarios: IUsuario[]) => {

    const {data} = await chatApi.get('/mensajes/usuarios');

    dispatch(cargarUsuarios(data.usuarios))

    const usuario = usuarios.find(user => user.uid === chatActivo?.uid);
    if (usuario) {
      dispatch(setChatActivo(usuario!));

    }

  }


  return {
    // Propiedades
    chatActivo,
    mensajes,
    usuarios,



    // Métodos
    onCargarUsuarios,

    onLoadMensajes
  }


}