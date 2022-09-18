import { FC } from 'react';
import { Box, Typography, Card, styled } from '@mui/material';
import { format } from 'date-fns';
import { IMensaje } from '../../interfaces';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import { Element } from 'react-scroll';
import { Label } from '../ui';

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(1)} 10px;
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      min-width: 150px;
      display: block;
`
);

interface Props {
  mensaje: IMensaje;
}


export const OutgoingMessage: FC<Props> = ({ mensaje }) => {
  return (
    <Element name={mensaje._id}>

      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-end"
        py={1}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-end"
          mr={2}
        >
          <CardWrapperPrimary>
            {mensaje.mensaje}
            <Typography fontSize={11} justifyContent='space-between'  display='flex' alignItems='end'>
              <b style={{color: '#1D5C63', }}>

              {
                
                format(new Date(mensaje.createdAt), 'HH:mm dd MMM yyyy')
                
              }
              </b>


          

                {
                  mensaje.status === 'leido' && (
                    <DoneAllIcon fontSize='small' htmlColor='#1D5C63' sx={{ ml: 0.5 }} />

                  )
                }
                {

                  mensaje.status === 'enviado' && (
                    <DoneIcon fontSize='small' sx={{ ml: 0.5 }} />

                  )
                }
                {
                  mensaje.status === 'entregado' && (
                    <DoneAllIcon fontSize='small' sx={{ ml: 0.5 }} />

                  )

                }
              
            </Typography>
          </CardWrapperPrimary>

        </Box>


      </Box>
    </Element>

  )
}
