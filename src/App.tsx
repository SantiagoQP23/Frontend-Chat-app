import { ThemeProvider, CssBaseline } from '@mui/material'
import { themeCreator } from './themes/base';
import { AppRouter } from './routers';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
//import '/src/utils/chart';

function App() {
  const theme = themeCreator("NebulaFighterTheme");

  return (
    <React.StrictMode>

      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
