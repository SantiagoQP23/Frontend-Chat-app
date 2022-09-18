import { useAppSelector , useAppDispatch } from "./";

import { chatApi } from "../api";

import { onLogin, onChecking, onLogout, clearErrorMessage} from "../store/slices/auth";
import { onLogoutChat } from "../store/slices/chat";


export const useAuthStore = () => {

  const {status, usuario, error} = useAppSelector( state => state.auth);
  const dispatch = useAppDispatch();

  const startLogin = async (email: string, password: string ) => {
    dispatch( onChecking() );
    try {
      const {data} = await chatApi.post('/auth/login', {email, password});
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', String(new Date().getTime()) );

      dispatch(onLogin(data.usuario));
      
    } catch (error) {
     logout('Credenciales incorrectas');
    }
    
  }


  const checkAuthToken =async () => {
    const token = localStorage.getItem('token');

    if(!token )
      return logout('');

    try {
      const {data} = await chatApi.get('auth/renew')
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', String(new Date().getTime()) );
  
      dispatch(onLogin(data.usuario));

    } catch (error) {
      localStorage.clear();
      logout('');
      
    }
    
    
  }




  const logout = (msg : string) => {
    dispatch( onLogout(msg));
    dispatch(onLogoutChat());
    localStorage.clear();
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 3000)
    

  }





  return {
    // Propiedades
    error,
    status, 
    usuario,


    // Métodos
    startLogin,
    checkAuthToken, 
    logout
    

  }


}
