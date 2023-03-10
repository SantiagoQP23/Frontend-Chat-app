import { useState, ChangeEvent, useRef, FC } from 'react';
import {
  Box, Typography, FormControlLabel, Switch, Tabs, Tab, TextField, IconButton,
  InputAdornment, Avatar, List, Button, Tooltip, Divider, AvatarGroup,
  ListItemButton, ListItemAvatar, ListItemText, lighten, ListItem, Popover, ListSubheader
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { formatDistance, subMinutes, subHours, format, isToday } from 'date-fns';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { useAppSelector, useAuthStore } from '../../hooks';
import { selectChat, setChatActivo } from '../../store/slices/chat';
import { useAppDispatch } from '../../hooks/useRedux';
import { IUsuario } from '../../interfaces';

import { HeaderSidebar, Label } from '../ui';
import { useChatStore } from '../../hooks/useChatStore';
import { scrollToBottom } from '../../helpers/scrollToBottom';



const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
          background-color: ${theme.colors.success.lighter};
          color: ${theme.colors.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `
);

const MeetingBox = styled(Box)(
  ({ theme }) => `
          background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
          margin: ${theme.spacing(2)} 0;
          border-radius: ${theme.general.borderRadius};
          padding: ${theme.spacing(2)};
    `
);

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(1.5)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);

interface Props {
  handleClose: () => void;
}

export const SidebarContent: FC<Props> = ({ handleClose }) => {

  const ref = useRef<any>(null);

  const { usuario } = useAuthStore();
  const { chatActivo } = useChatStore();
  const { usuarios } = useAppSelector(selectChat);

  const dispatch = useAppDispatch();



  const [state, setState] = useState({
    invisible: true
  });



  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const [currentTab, setCurrentTab] = useState<string>('todo');

  const tabs = [
    { value: 'todo', label: 'Todos' },
    // { value: 'unread', label: 'Unread' },
    // { value: 'archived', label: 'Archived' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const activarChat = (usuario: IUsuario) => {
    dispatch(setChatActivo(usuario));
    handleClose();
    scrollToBottom('mensajes')
  }

  return (
    <RootWrapper>
      <HeaderSidebar />

      {/* <TextField
        sx={{ mt: 2, mb: 1 }}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
        placeholder="Search..."
      /> */}

      <Typography sx={{ mb: 1, mt: 2 }} variant="h3">
        Chats
      </Typography>

      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>

      <Box mt={2}>

        {currentTab === 'todo' && (
          <>
            <List disablePadding component="div">
              {
                usuarios!.length > 0 && usuarios?.filter(u => u.uid !== usuario!.uid).map(u => (

                  <ListItemWrapper key={u.uid} onClick={() => activarChat(u)} selected={u.uid === chatActivo?.uid}>
                    <ListItemAvatar>
                      <Avatar src={u.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ mr: 1 }}
                      primaryTypographyProps={{
                        color: 'textPrimary',
                        variant: 'h5',
                        noWrap: true
                      }}
                      secondaryTypographyProps={{
                        color: 'textSecondary',
                        noWrap: true
                      }}
                      primary={u.nombre}
                      secondary={u.mensaje.mensaje}
                    />

                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: '12px',
                        align: 'right'
                      }}
                      secondaryTypographyProps={{
                        align: 'right'
                      }}

                      primary={
                        u.mensaje._id
                          ?
                          isToday(new Date(u.mensaje?.createdAt))
                            ? format(new Date(u.mensaje?.createdAt), 'HH:mm')
                            : format(new Date(u.mensaje?.createdAt), 'dd MMM yyyy')

                          : ''
                      }

                      secondary={u.cantidadMensajes > 0 && <Label color="success" >
                        <b>{u.cantidadMensajes}</b>
                      </Label>}

                    />



                  </ListItemWrapper>
                )
                )

              }
            </List>

          </>

        )}
        {currentTab === 'unread' && (
          <List disablePadding component="div">
            {
              usuarios!.length > 0 && usuarios?.filter(u => u.uid !== usuario!.uid)
                .filter(u => u.cantidadMensajes > 0)
                .map(u => (

                  <ListItemWrapper key={u.uid} onClick={() => activarChat(u)} selected={u.uid === chatActivo?.uid}>
                    <ListItemAvatar>
                      <Avatar src={u.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ mr: 1 }}
                      primaryTypographyProps={{
                        color: 'textPrimary',
                        variant: 'h5',
                        noWrap: true
                      }}
                      secondaryTypographyProps={{
                        color: 'textSecondary',
                        noWrap: true
                      }}
                      primary={u.nombre}
                      secondary={u.mensaje.mensaje}
                    />
                    {

                      u.cantidadMensajes > 0 && <Label color="secondary">
                        <b>{u.cantidadMensajes}</b>
                      </Label>
                    }
                  </ListItemWrapper>
                )
                )

            }
          </List>


        )}
        {currentTab === 'archived' && (
          <Box pb={3}>
            <Divider sx={{ mb: 3 }} />
            <AvatarSuccess>
              <CheckTwoToneIcon />
            </AvatarSuccess>
            <Typography sx={{ mt: 2, textAlign: 'center' }} variant="subtitle2">
              Hurray! There are no archived chats!
            </Typography>
            <Divider sx={{ mt: 3 }} />
          </Box>
        )}
      </Box>


      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h5" align='center'>Desarrollado por Santiago Quirumbay</Typography>

      </Box>

    </RootWrapper >
  );
}

