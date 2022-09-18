import { FC } from 'react';
import { Box, Typography, Card, styled } from '@mui/material';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { format, formatDistance, subHours } from 'date-fns';
import { IMensaje } from '../../interfaces';


const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(1)} 10px;
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      min-width: 150px;
      display: block;
`
);


interface Props {
  mensaje: IMensaje;
}


export const IncomingMessage: FC<Props> = ({ mensaje }) => {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      py={1}
    >
      {/*  <Avatar
          variant="rounded"
          sx={{ width: 50, height: 50 }}
          alt="Zain Baptista"
          src="/static/images/avatars/2.jpg"
        /> */}
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="flex-start"
        ml={2}
      >
        <CardWrapperSecondary>
          {mensaje.mensaje}
          <Typography fontSize={10} align='right'>
            {
              format(new Date(mensaje.createdAt), 'dd MMM yyyy HH:mm')
            }
          </Typography>

        </CardWrapperSecondary>
        {/*  <Typography
            variant="subtitle1"
            sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
          >
            <ScheduleTwoToneIcon sx={{ mr: 0.5 }} fontSize="small" />
            {formatDistance(subHours(new Date(mensaje.createdAt), 0), new Date(), {
              addSuffix: true
            })}
          </Typography> */}
      </Box>
    </Box>
  )
}
