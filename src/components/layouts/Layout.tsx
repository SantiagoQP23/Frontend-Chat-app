import { Box, styled } from "@mui/material";
import { FC } from "react";



const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
          padding-left: ${theme.sidebar.width};
        }
        `
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
        height: 100%;
`
);

interface Props {
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

      <MainWrapper>
        <MainContent>
          {children}


        </MainContent>
      </MainWrapper>
    </Box>
  )
}
