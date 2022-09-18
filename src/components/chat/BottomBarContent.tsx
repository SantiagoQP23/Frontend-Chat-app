import {
  Card, Avatar, Tooltip, IconButton, Box, Button, Hidden,
  TextField, Divider, InputBase
} from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { ChangeEvent, useContext, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { useAuthStore } from '../../hooks/useAuthStore';
import { addMensaje, mensajeEnviado, nuevoMensaje, selectChat } from '../../store/slices/chat';
import { SocketContext } from '../../context/SocketContext';
import { IMensaje } from '../../interfaces';
import { useAppDispatch } from '../../hooks/useRedux';
import { scrollToBottom, scrollToBottomAnimated } from '../../helpers';

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(15)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

const Input = styled('input')({
  display: 'none'
});


export const BottomBarContent = () => {

  const [mensaje, setMensaje] = useState<string>('');

  const theme = useTheme();


  const { usuario } = useAuthStore();

  const { chatActivo } = useAppSelector(selectChat);

  const { socket } = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMensaje(event.target.value);

  }

  const onSubmit = () => {
    

    if (mensaje.length === 0) { return; }

    socket?.emit(
      'mensaje-personal',
      {
        de: usuario?.uid, para: chatActivo?.uid, mensaje
      },
      ({ newMensaje }: { newMensaje: IMensaje }) => {
        if (newMensaje) {
          setMensaje('');

          dispatch(addMensaje(newMensaje));
          dispatch(mensajeEnviado(newMensaje));
          scrollToBottomAnimated(newMensaje._id);

        }
        // TODO dispatch del mensaje creado
      });


  }

  return (
    <Box
      sx={{
        background: theme.colors.alpha.white[50],
        display: 'flex',
        alignItems: 'center',
        p: 1
      }}
    >


      <Box component='form' flexGrow={1} display="flex" alignItems="center" onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <Avatar
          sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}
          alt={usuario!.nombre}
          src={usuario!.avatar}
        />
        <MessageInputWrapper
          autoFocus
          placeholder="Write your message here..."
          fullWidth
          value={mensaje}
          onChange={onChange}
          
        />
      </Box>
      <Box>
     {/*    <Tooltip arrow placement="top" title="Choose an emoji. Coming soon."  >
          <IconButton
            sx={{ fontSize: theme.typography.pxToRem(16) }}
            color="primary"
          >
            😀
          </IconButton>
        </Tooltip> */}
        <Input accept="image/*" id="messenger-upload-file" type="file" disabled/>
        <Tooltip arrow placement="top" title="Attach a file. Coming soon.">
          <label htmlFor="messenger-upload-file">
            <IconButton  color="primary" component="span" disabled>
              <AttachFileTwoToneIcon fontSize="small" />
            </IconButton>
          </label>
        </Tooltip>
        <Button
          variant="contained"
          onClick={onSubmit}
          type='submit'
          size='small'
        >
          <SendTwoToneIcon />
        </Button>
      </Box>
    </Box>

  );
}

