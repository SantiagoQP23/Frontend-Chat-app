import { useState } from 'react';
import {
  Box,
  Typography,
  Hidden,
  Container,
  Button,
  Grid
} from '@mui/material';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import LoadingButton from '@mui/lab/LoadingButton';

import { styled } from '@mui/material/styles';

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.black1};
`
);

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[100]};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
);

export const ChatSelect = () => {

  const [pending, setPending] = useState(false);
  function handleClick() {
    setPending(true);
  }

  return (
    <>

      <MainContent>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
        >
          <Grid
            xs={12}
            
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Box textAlign="center">
                {/* <img
                  alt="500"
                  height={260}
                  src="/static/images/status/500.svg"
                /> */}
                <Typography variant="h2" sx={{ my: 2 }}>
                  Chat App
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  Por favor, selecciona un chat.
                </Typography>
               {/*  <LoadingButton
                  onClick={handleClick}
                  loading={pending}
                  variant="outlined"
                  color="primary"
                  startIcon={<RefreshTwoToneIcon />}
                >
                  Refresh view
                </LoadingButton> */}
                
              </Box>
            </Container>
          </Grid>
         {/*  <Hidden mdDown>
            <GridWrapper
              xs={12}
              md={6}
              alignItems="center"
              display="flex"
              justifyContent="center"
              item
            >
              <Container maxWidth="sm">
                <Box textAlign="center">
                  <TypographyPrimary variant="h1" sx={{ my: 2 }}>
                    Tokyo Free Black React Admin Dashboard
                  </TypographyPrimary>
                  <TypographySecondary
                    variant="h4"
                    fontWeight="normal"
                    sx={{ mb: 4 }}
                  >
                    Tokyo Free Black React Admin Dashboard is built using the latest industry standards and features a clean and premium design style, making use of colors and accents to improve the user experience for all included flows and pages.
                  </TypographySecondary>
                  <Button
                    href="/overview"
                    size="large"
                    variant="contained"
                  >
                    Overview
                  </Button>
                </Box>
              </Container>
            </GridWrapper>
          </Hidden> */}
        </Grid>
      </MainContent>
    </>
  );
}

