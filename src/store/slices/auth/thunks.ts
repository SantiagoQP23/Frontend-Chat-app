import { IUsuario } from "../../../interfaces";
import { AppThunk } from "../../store";
import { cargarUsuarios, setChatActivo } from "../chat";
import { fileUpload } from "../../../helpers/fileUpload";
import { updateAvatar } from "./authSlice";
import { chatApi } from "../../../api";

export const onCargarUsuarios = (): AppThunk => async (dispatch, getState) => {
  try {
    const { data } = await chatApi.get("/mensajes/usuarios");

    dispatch(cargarUsuarios(data.usuarios));

    const { chatActivo } = getState().chat;

    dispatch(cargarUsuarios(data.usuarios));
  } catch (error) {
    console.log(error);
  }
};

export const startUploadingFile =
  (files: FileList): AppThunk =>
  async (dispatch) => {
    const imageUrl = await fileUpload(files[0]);

    if (imageUrl) {
      dispatch(updateAvatar(imageUrl));
    }
  };
