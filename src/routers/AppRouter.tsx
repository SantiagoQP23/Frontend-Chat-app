import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layouts';
import { Profile, Settings } from '../components/users';
import { useAuthStore } from "../hooks"
import { ChatPage, LoginPage, SignupPage } from '../pages';





export const AppRouter = () => {


  const { checkAuthToken, status } = useAuthStore();



  useEffect(() => {
    checkAuthToken();
  }, [])


  if (status === 'checking') {
    return <h3>Cargando...</h3>
  }


  return (

    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path='/auth/signup' element={<SignupPage />} />
              <Route path='/auth/*' element={<LoginPage />}></Route>
              <Route path='/*' element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>


              <Route path='/' element={<ChatPage />} />
              <Route path='/user' element={<Profile />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/*' element={<Navigate to="/" />} />
            </>
            
            
  )
}


    </Routes >

    
  )
}
