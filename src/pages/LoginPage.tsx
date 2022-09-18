import { ChangeEvent, useEffect, useState } from 'react';


import { Grid, Box, TextField, Typography, FormControl, FormLabel, FormHelperText, Button, Link, Paper, Avatar, FormControlLabel, Checkbox, Chip } from '@mui/material';
import { NavLink } from 'react-router-dom';

// import { authError, selectAuth, startLogin } from '../reducers';
// import { useAppDispatch } from '../app/hooks';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { useAppSelector } from '../hooks/useRedux';
import { useForm } from '../hooks/useForm';
import { useAuthStore } from '../hooks';




const initialForm = {
  email: '@gmail.com',
  password: '1234',
  rememberme: true
}

interface FormData {
  email: string;
  password: string;
  rememberme: boolean
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Santiago Quirumbay
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export const LoginPage = () => {


  const { values, handleInputChange, handleInputChecked, reset } = useForm<FormData>(initialForm);

  const { startLogin, error} = useAuthStore();



  /*  const dispatch = useAppDispatch();
 
   const { error, logged } = useAppSelector(selectAuth);
  */
  const handleLogin = () => {


    startLogin(values.email, values.password);

  }


  return (
    <>
      <Box >
        <Grid p={0} m={0} container component="main" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
               <Chip
                label={error}
                color="error"
                sx={{ display: !!error ? "flex" : "none" }}

              />
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name='email'
                  value={values.email}
                  onChange={handleInputChange}



                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  name='password'
                  value={values.password}
                  onChange={handleInputChange}



                />
                <FormControlLabel

                  control={
                    <Checkbox
                      name='rememberme'
                      checked={values.rememberme}
                      onChange={handleInputChecked}
                      color="primary"
                    />}
                  label={"Remember me "}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin()
                  }
                  }
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/auth/signup" variant="body2" component={NavLink} >
                      {"No tienes una cuenta? Regístrate"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>

    </>
  )
}

