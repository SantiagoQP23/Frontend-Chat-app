import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Grid, Button, FormControl, Typography, Chip } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useForm } from '../../hooks';
import chatApi from '../../api/chatApi';


interface Props {
  handleClose: () => void;
  open: boolean;
}



const initialForm = {
  currentPassword: '',
  newPassword1: '',
  newPassword2: ''
}

interface FormData {
  currentPassword: string;
  newPassword1: string;
  newPassword2: string;
}



export const ChangePassword: FC<Props> = ({ handleClose, open }) => {

  const { values, handleInputChange, reset } = useForm<FormData>(initialForm);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { currentPassword, newPassword1, newPassword2 } = values;

  const changePassword = async () => {

    try {
      const { data } = await chatApi.patch('/auth/password', { password: currentPassword, newPassword: newPassword1 });
      setError('');
      setSuccess(data.msg);

      reset();


    } catch (error: any) {
      setError(error.response.data.msg);
    }

  }


  const onSubmit = () => {

    if ((currentPassword.length === 0 || newPassword1.length === 0 || newPassword2.length === 0)) {
      setError('Rellenar todos los campos');
      return;
    }

    if (newPassword1 !== newPassword2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    changePassword();
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [success]);

  return (
    <Dialog maxWidth='xs' onClose={handleClose} open={open}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>Please enter the current password and the new password.</Typography>
        </DialogContentText>
        <Chip
          label={error}
          color="error"
          sx={{ display: !!error ? "flex" : "none" }}

        />
        <Chip
          label={success}
          color="success"
          sx={{ display: !!success ? "flex" : "none" }}

        />

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}>

          <Grid container spacing={1} justifyContent='right'>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ my: 1, mb: 2 }} >

                <TextField
                  required
                  label="Current password"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  margin='dense'
                  value={currentPassword}
                  onChange={handleInputChange}
                  variant='filled'


                />




                <TextField
                  required
                  label="New password"
                  name="newPassword1"
                  type="password"
                  autoComplete="current-password"
                  margin='dense'
                  value={newPassword1}
                  onChange={handleInputChange}
                  variant='filled'
                />



                <TextField
                  required
                  label="New password"
                  name="newPassword2"
                  type="password"
                  autoComplete="current-password"
                  margin='dense'
                  value={newPassword2}
                  onChange={handleInputChange}
                  variant='filled'
                />
              </FormControl>
            </Grid>


            <Button type='submit' variant='contained' >Change password</Button>
            <Button onClick={handleClose}>Cancelar</Button>


          </Grid>
        </form>
      </DialogContent>


    </Dialog >
  )
}
