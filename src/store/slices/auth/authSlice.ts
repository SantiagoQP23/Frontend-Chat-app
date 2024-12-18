import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { IUsuario } from "../../../interfaces/";
import { AppThunk, RootState } from "../../../store/";

export interface AuthState {
  usuario: IUsuario | null;

  error: string | null;

  status: "checking" | "authenticated" | "not-authenticated";
}
/*
usuario:  idUsuario: 1,
 nombreUsuario: "Nombre del usuario",
 nombres: "No se ha iniciado sesión",
 
 cargo: {
   idCargo: 1,
   nombre: 'Admin',
   descripcion: 'alsdjl',
 }} */

const initialState: AuthState = {
  usuario: null,

  error: null,
  status: "checking",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.usuario = null;
      state.error = null;
    },

    onLogin: (state, { payload }: PayloadAction<IUsuario>) => {
      state.usuario = payload;
      state.status = "authenticated";
    },
    onLogout: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.usuario = null;
      state.status = "not-authenticated";
    },
    clearErrorMessage: (state) => {
      state.error = null;
    },
    updateAvatar: (state, { payload }: PayloadAction<string>) => {
      state.usuario!.avatar = payload;
    },
    updateNombre: (state, { payload }: PayloadAction<string>) => {
      state.usuario!.nombre = payload;
    },
  },
});

export const {
  onLogin,
  onChecking,
  onLogout,
  clearErrorMessage,
  updateAvatar,
  updateNombre,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
