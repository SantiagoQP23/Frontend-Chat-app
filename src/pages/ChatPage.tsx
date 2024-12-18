import { useEffect, useRef, useState } from "react";

import {
  BottomBarContent,
  SidebarContent,
  ChatContent,
  TopBarContent,
} from "../components/chat";

import { Scrollbars } from "react-custom-scrollbars-2";

import { Box, Drawer, IconButton, Divider } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Layout } from "../components/layouts";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { ChatSelect } from "../components/chat/ChatSelect";
import { selectChat } from "../store/slices/chat";

import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { Scrollbar } from "../components/ui";
import { onCargarUsuarios } from "../store/slices/auth/thunks";
import { Element } from "react-scroll";

const RootWrapper = styled(Box)(
  ({ theme }) => `
  height: calc(100vh);
       display: flex;
`
);

// background: ${theme.colors.alpha.white[100]};
const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 350px;
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);
// background: ${theme.colors.alpha.white[100]};

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(2)};
        align-items: center;
`
);

const ChatBottomBar = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(3)};
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.colors.alpha.white[100]};
`
);

const DrawerWrapperMobile = styled(Drawer)(
  () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`
);

export const ChatPage = () => {
  const theme = useTheme();

  const { chatActivo } = useAppSelector(selectChat);

  const dispatch = useAppDispatch();

  const [mobileOpen, setMobileOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    dispatch(onCargarUsuarios());
  }, []);

  return (
    <>
      <RootWrapper className="Mui-FixedWrapper">
        <DrawerWrapperMobile
          sx={{
            display: { lg: "none", xs: "inline-block" },
          }}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <Scrollbar>
            <SidebarContent handleClose={handleDrawerToggle} />
          </Scrollbar>
        </DrawerWrapperMobile>

        <Sidebar sx={{ display: { xs: "none", lg: "inline-block" } }}>
          <Scrollbar>
            <SidebarContent handleClose={handleDrawerToggle} />
          </Scrollbar>
        </Sidebar>

        <ChatWindow>
          <ChatTopBar sx={{ display: { xs: "flex", lg: "inline-block" } }}>
            <IconButtonToggle
              sx={{
                display: { lg: "none", xs: "flex" },
                mr: 2,
              }}
              color="primary"
              onClick={handleDrawerToggle}
              size="small"
            >
              <MenuTwoToneIcon />
            </IconButtonToggle>
            {chatActivo && <TopBarContent />}
          </ChatTopBar>
          <Box flex={1}>
            <Scrollbar>
              {chatActivo ? <ChatContent /> : <ChatSelect />}
            </Scrollbar>
          </Box>
          <Divider />
          {chatActivo && <BottomBarContent />}
        </ChatWindow>
      </RootWrapper>
    </>
  );
};
