
import { io, Socket } from "socket.io-client";
import { useMemo, useEffect, useState, useCallback } from "react";
//import { ClientToServerEvents, ServerToClientEvents } from "../interfaces/sockets";


export const useSocket = (serverPath: string) => {
  
 /*  const socket : Socket<ServerToClientEvents, ClientToServerEvents>  = useMemo(() => io(serverPath, {
    transports: ['websocket'],
    autoConnect: true
  }), [serverPath]); */
  
  const [online, setOnline] = useState<boolean | undefined>(false);

  const [socket, setSocket] = useState<Socket | null>(null);



  const conectarSocket = useCallback( () => {

    const token = localStorage.getItem('token');

     const socketTemp = io(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': token 
      }
    
    });

    setSocket(socketTemp);

  }, [serverPath]);

  const desconectarSocket = useCallback( () => {

    socket?.disconnect();
  }, [socket]);



  useEffect(() => {

    setOnline(socket?.connected);
  }, [socket]);


  useEffect(() => {
    socket?.on('connect', () => {
      setOnline(true);
    });

  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => {
      setOnline(false);
    });

  }, [socket]);


  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket
  }

}