import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton, Container
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { useAuthStore } from '../../hooks/useAuthStore';
import { NavLink } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/useRedux';
import { startUploadingFile } from '../../store/slices/auth/thunks';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

export const Profile = () => {

  const { usuario } = useAuthStore();

  const dispatch = useAppDispatch();

  const user = {
    savedCards: 7,
    name: 'Catherine Pike',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: 'Web Developer',
    location: 'Barcelona, Spain',
    followers: '465'
  };

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {

    if (target.files?.length === 0) return;


    dispatch(startUploadingFile(target.files!));
  }

  return (
    <>
      <Box display="flex" my={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }} to='/' component={NavLink}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {usuario!.nombre}
          </Typography>
          <Typography variant="subtitle2">
            {usuario!.email}
          </Typography>
        </Box>
      </Box>
      <Container maxWidth="lg">

        <CardCover>
          <CardMedia />
          <CardCoverAction>
            <Input accept="image/*" id="change-cover" multiple type="file" />
            <label htmlFor="change-cover">
              <Button
                startIcon={<UploadTwoToneIcon />}
                variant="contained"
                component="span"
              >
                Change cover
              </Button>
            </label>
          </CardCoverAction>
        </CardCover>
        <AvatarWrapper>
          <Avatar variant="rounded" alt={usuario!.nombre} src={usuario!.avatar} />
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
              onChange={onFileInputChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>
        <Box py={2} pl={2} mb={3}>
          <Typography gutterBottom variant="h4">
            {usuario!.nombre}
          </Typography>
          <Typography variant="subtitle2">{usuario!.email}</Typography>
         
          {/* <Box
            display={{ xs: 'block', md: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Button size="small" variant="contained">
                Follow
              </Button>
              <Button size="small" sx={{ mx: 1 }} variant="outlined">
                View website
              </Button>
              <IconButton color="primary" sx={{ p: 0.5 }}>
                <MoreHorizTwoToneIcon />
              </IconButton>
            </Box>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              size="small"
              variant="text"
              endIcon={<ArrowForwardTwoToneIcon />}
            >
              See all {user.followers} connections
            </Button>
          </Box> */}
        </Box>
      </Container>
    </>
  );
};


