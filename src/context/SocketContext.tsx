import React, { createContext, FC, useEffect } from "react";
import { Socket } from "socket.io-client";

/* import { useSelector } from "react-redux";
import { useAppSelector } from "../hooks/useRedux";
import { useSocket } from '../hooks/useSocket';
import { selectAuth } from "../reducers"; */
import { getEnvVariables } from "../helpers/getEnvVariables";
import { useAuthStore, useSocket } from "../hooks";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  addMensaje,
  cargarUsuarios,
  mensajeEntregado,
  mensajeLeido,
  mensajesEntregados,
  nuevoMensaje,
  selectChat,
  usuarioConectado,
  usuarioDesconectado,
} from "../store/slices/chat";
import { useChatStore } from "../hooks/useChatStore";
import { onCargarUsuarios } from "../store/slices/auth/thunks";
import { IMensaje } from "../interfaces/interfaces";
import { onMensajesLeidos, onNuevoMensaje } from "../store/slices/chat/thunks";

interface ISocket {
  socket: Socket | null;
  online: boolean | undefined;
}

interface Props {
  children: React.ReactNode;
}

export const SocketContext = createContext({} as ISocket);

const { VITE_CHAT_BACKEND } = getEnvVariables();

export const SocketProvider: FC<Props> = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } =
    useSocket(VITE_CHAT_BACKEND);

  const { status, usuario } = useAuthStore();
  const { chatActivo } = useAppSelector(selectChat);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "not-authenticated") {
      console.log("Desconectando socket");
      desconectarSocket();
    }
  }, [status, desconectarSocket]);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Conectando socket");
      conectarSocket();
    }
  }, [status, conectarSocket]);

  /*   useEffect(() => {
    
    socket?.on('lista-usuarios', (usuarios) => {
     
      dispatch(onCargarUsuarios(usuarios));

    });

  }, [socket, onCargarUsuarios]); */

  useEffect(() => {
    socket?.on("usuario-conectado", (uid) => {
      dispatch(usuarioConectado(uid));
      dispatch(mensajesEntregados(uid));
    });
  }, [socket, usuarioConectado]);

  useEffect(() => {
    socket?.on("usuario-desconectado", ({ uid, lastConnection }) => {
      dispatch(usuarioDesconectado({ uid, lastConnection }));
    });
  }, [socket, usuarioDesconectado]);

  useEffect(() => {
    socket?.on("mensaje-personal", ({ mensaje }: { mensaje: IMensaje }) => {
      socket.emit("mensaje-entregado", mensaje._id);

      dispatch(onNuevoMensaje(mensaje, socket));

      // socket?.emit('mensajes-leidos', chatActivo?.uid);
    });
  }, [socket, addMensaje]);

  useEffect(() => {
    socket?.on("mensaje-entregado", (idMensaje) => {
      dispatch(mensajeEntregado(idMensaje));
    });
  }, [socket, mensajeEntregado]);

  useEffect(() => {
    socket?.on("mensaje-leido", (idMensaje) => {
      dispatch(mensajeLeido(idMensaje));
    });
  }, [socket, mensajeLeido]);

  useEffect(() => {
    socket?.on("mensajes-leidos", (uid) => {
      dispatch(onMensajesLeidos(uid));
    });
  }, [socket, onMensajesLeidos]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
