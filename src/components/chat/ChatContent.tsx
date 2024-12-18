import { useEffect, useContext, useRef, useLayoutEffect } from "react";

import {
  Box,
  Avatar,
  Typography,
  Card,
  Divider,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import RefreshIcon from "@mui/icons-material/Refresh";

import {
  formatDistance,
  format,
  subDays,
  subHours,
  subMinutes,
} from "date-fns";
import { useChatStore } from "../../hooks";
import { IncomingMessage, OutgoingMessage } from "./";
import { SocketContext } from "../../context/SocketContext";

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
  .MuiDivider-wrapper {
    border-radius: ${theme.general.borderRadiusSm};
    text-transform: none;
    background: ${theme.palette.background.default};
    font-size: ${theme.typography.pxToRem(13)};
    color: ${theme.colors.alpha.black[50]};
  }
`
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);
// const useMountEffect = fun => useEffect(fun, []);

export const ChatContent = () => {
  const { chatActivo, mensajes, onLoadMensajes } = useChatStore();

  //const {scrollX, scrollY} = useWindowPosition();

  const { socket } = useContext(SocketContext);

  const messageRef = useRef();

  useEffect(() => {
    onLoadMensajes();
    socket?.emit("mensajes-leidos", chatActivo?.uid);
    if (messageRef.current) {
      messageRef.current!.scrollIntoView(false);
    }
  }, [chatActivo?.uid]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [mensajes]);

  /*   useMountEffect(() => messageRef.current!.scrollIntoView(false))
   */ /*   useLayoutEffect(() => {
  
  }, [])
 */

  return (
    <Box py={3} px={1} ref={messageRef}>
      {mensajes.length > 3 && (
        <DividerWrapper>
          <IconButton>
            <RefreshIcon />
          </IconButton>

          {/* {format(subDays(new Date(), 3), 'MMMM dd yyyy')} */}
        </DividerWrapper>
      )}

      <>
        {mensajes.length > 0 &&
          mensajes.map((msg) =>
            msg.de === chatActivo!.uid ? (
              <IncomingMessage key={msg._id} mensaje={msg} />
            ) : (
              <OutgoingMessage key={msg._id} mensaje={msg} />
            )
          )}
      </>

      {/*  <DividerWrapper>
        {format(subDays(new Date(), 5), 'MMMM dd yyyy')}
      </DividerWrapper>

      <DividerWrapper>Today</DividerWrapper>
 */}
    </Box>
  );
};
