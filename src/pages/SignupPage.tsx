import { useState, useEffect } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Box,
  Chip

} from '@mui/material/';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { NavLink, useNavigate } from 'react-router-dom';
import { chatApi } from '../api';
import { useAppDispatch } from '../hooks/useRedux';
import { onLogin } from '../store/slices/auth';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const initialResponse = { error: '', success: '' }

export const SignupPage = () => {

  const [response, setResponse] = useState<{ error: string; success: string }>(initialResponse);

  const dispatch = useAppDispatch();

  const { error, success } = response;

  const signup = async (formValues: any) => {

    try {
      const {data} = await chatApi.post('/auth/signup', formValues);
     
      setResponse({...response, success: data.msg})

      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', String(new Date().getTime()) );

      dispatch(onLogin(data.usuario));

      
    } catch (error: any) {
      setResponse({...response, error: error!.response.data.errors[0].msg})

    }
  }



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const formValues = {
      email: data.get('email'),
      password: data.get('password'),
      nombre: data.get('firstName') + ' ' + data.get('lastName')
    };

    signup(formValues);
   
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponse(initialResponse);
    }, 3000);

    return () => clearTimeout(timer);
  }, [response]);

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/auth/login" variant="body2" component={NavLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>

  );
}