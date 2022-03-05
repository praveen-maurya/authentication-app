import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';

import {
    makeStyles
  } from "@material-ui/core";
import { endPoints } from '../../env/endPoints';
import { LogInActions } from '../../redux/LoginReduxSlice';
import { sblcInterceptor } from '../../config/SblcInterceptor';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Home } from '../home/home';
import { renderPage } from '../renderPage/renderPage';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "18px",
      marginLeft: theme.spacing(2),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
  }));
  const logoutUrl = endPoints.baseUrl + '/users/signout';

export default function Navbar() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const loginInfo = useSelector(state => state.loginRedux);
  const redirect = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState('home');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    sblcInterceptor.post(logoutUrl)
    .then(response => {
      dispatch(LogInActions.setLogIn(false));
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    console.log(currentStep)
   // redirect('/'+currentStep)
  }, [currentStep])

  const Url = (props) => {
    setCurrentStep(props)
    console.log(props, currentStep)
   // redirect('/'+props)
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.logo}>
          UPB
        </Typography>
        <div className={classes.navlinks}>
        {!loginInfo.logIn &&    <Link to="/" className={classes.link}>
              Login
            </Link>
}
            {/* <Link to="/about" className={classes.link}>
              About
            </Link> */}
            {!loginInfo.logIn &&   <Link to="/register" className={classes.link}>
            Registration
            </Link>
}
            {loginInfo.logIn && <Link to="/logout" onClick={signOut} className={classes.link}>
            Logout
            </Link>
}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          <ListItem
            button
            component="a"
            onClick={() => Url('patientForm')}>
              <FormatColorFillIcon />
            <ListItemText primary="Patient Form" />
        </ListItem>
        <ListItem
            button
            component="a"
            onClick={() => Url('page2')}>                                          
            <ListItemText primary="Page 2" />
        </ListItem>
        <ListItem
            button
            component="a"
            onClick={() => Url('page3')}>                                          
            <ListItemText primary="Page 3" />
        </ListItem>
        </List>
      </Drawer>
      <Main style={{padding: '60px'}} open={open}>
        {renderPage(currentStep)}
      </Main>
    </Box>
  );
}
