import { chatApi } from "../api";


export const fileUpload = async (file: File) => {

  if(!file) throw new Error('No se envió un archivo a subir');
  
  const formData = new FormData();

  formData.append('upload_preset', 'chat-app');
  formData.append('imagen', file);  


  try {
    
    const {data} = await chatApi.patch('/auth/avatar', formData);

    
    
    return data.url;


   
  } catch (error) {
   
    throw new Error('Error al subir la imagen');
  }



}