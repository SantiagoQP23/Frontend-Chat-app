import { IMensaje, IUsuario } from "../../../interfaces";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';




export interface ChatState {
  uid: string;
  chatActivo: IUsuario | null;
  usuarios: IUsuario[];
  mensajes: IMensaje[]

}


const initialState: ChatState = {
  uid: '',
  chatActivo: null,
  usuarios: [],
  mensajes: []
}


export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    cargarUsuarios: (state, { payload }: PayloadAction<IUsuario[]>) => {
      state.usuarios = payload;
    },
    setChatActivo: (state, { payload }: PayloadAction<IUsuario>) => {
      state.chatActivo = payload;
      state.usuarios = state.usuarios.map(
        user =>
          (user.uid === payload.uid )
            ? { ...user, cantidadMensajes: 0 }
            : user
      )
    },
    cargarMensajes: (state, { payload }: PayloadAction<IMensaje[]>) => {
      state.mensajes = payload;

    },
    addMensaje: (state, { payload }: PayloadAction<IMensaje>) => {

      state.mensajes.push(payload);
/* 
      state.usuarios = state.usuarios.map(
        user =>
          (user.uid === payload.para || user.uid === payload.de)
            ? { ...user, mensaje: payload}
            : user
      )
       */
      
      
    },
    nuevoMensaje: (state, { payload }: PayloadAction<IMensaje>) => {
      state.usuarios = state.usuarios.map(
        user =>
          (user.uid === payload.para || user.uid === payload.de)
            ? { ...user, mensaje: payload, cantidadMensajes: user.cantidadMensajes + 1 }
            : user
      )
    },

    mensajeEnviado: (state, { payload }: PayloadAction<IMensaje>) => {
      state.usuarios = state.usuarios.map(
        user =>
          (user.uid === payload.para || user.uid === payload.de)
            ? { ...user, mensaje: payload }
            : user
      )
    },
    

    mensajeEntregado: (state, { payload }: PayloadAction<string>) => {
      state.mensajes = state.mensajes.map(
        msg =>
          (msg._id === payload)
            ? { ...msg, status: 'entregado' }
            : msg
      )
    },
    mensajeLeido: (state, { payload }: PayloadAction<string>) => {
      state.mensajes = state.mensajes.map(
        msg =>
          (msg._id === payload)
            ? { ...msg, status: 'leido' }
            : msg
      )
    },
    // Recibe el id del usuario
    mensajesEntregados: (state, { payload }: PayloadAction<string>) => {

      state.mensajes = state.mensajes.map(
        msg =>
          (msg.para === payload && msg.status === 'enviado')
            ? { ...msg, status: 'entregado' }
            : msg
      )
    },
    mensajesLeidos: (state, { payload }: PayloadAction<string>) => {

      state.mensajes = state.mensajes.map(
        msg =>
          (msg.para === payload)
            ? { ...msg, status: 'leido' }
            : msg
      )
    },
    usuarioConectado: (state, { payload }: PayloadAction<string>) => {
      state.usuarios = state.usuarios.map(
        user =>
          (user.uid === payload)
            ? { ...user, online: true }
            : user
      )
      if (state.chatActivo?.uid === payload) {
        state.chatActivo = { ...state.chatActivo, online: true }

      }

    },
    usuarioDesconectado: (state, { payload }: PayloadAction<{ uid: string, lastConnection: Date }>) => {

      const { uid, lastConnection } = payload;

      state.usuarios = state.usuarios.map(
        user =>
          (user.uid === uid)
            ? { ...user, online: false, lastConnection }
            : user
      )
      if (state.chatActivo?.uid === uid) {
        state.chatActivo = { ...state.chatActivo, online: false, lastConnection }

      }

    },
    onLogoutChat: (state) => {
      state.uid = '';
      state.chatActivo = null;
      state.usuarios = [];
      state.mensajes = [];
    }




  }
});


export const {
  cargarUsuarios,
  setChatActivo,
  cargarMensajes,
  addMensaje,
  mensajeEntregado,
  usuarioConectado,
  usuarioDesconectado,
  nuevoMensaje,
  mensajesEntregados,
  onLogoutChat, 
  mensajesLeidos, 
  mensajeLeido, 
  mensajeEnviado
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export default chatSlice.reducer;