import { Box, Container, AppBar, Typography, Button, Toolbar, Avatar, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { texts } from '../../utils/translate';
import Context, { ContextProvider } from '../../context';
import SettingButton from './settingButton';
import { useFirebaseLogout } from '../../hooks/useFirebaseLogout';
import { auth } from '../../utils/firebase';
import { onAuthStateChanged } from "firebase/auth";
import UserMenu from '../userMenu';

const styles = {
  link:{
    margin: '0 10px',
  }
}

const Layout = ({ children }) => {
  const obj = useContext(Context);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged( auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0} variant='outlined' sx={{bgcolor: 'background.paper'}}>
          <Toolbar variant='dense'>
            <Avatar alt="logo" src="/images/ibercs.png" variant='square' sx={{ width: 56, height: 56 }} />
            <Box sx={{marginLeft: 5}}>
              <Link to="/" style={styles.link}>
                <Button variant="text" color='primary'>{texts[obj.Lang].NAVBAR_Inicio}</Button>
              </Link>
              <Link to="/forum" style={styles.link}>
                <Button variant="text" color='primary'>{texts[obj.Lang].NAVBAR_Forum}</Button>
              </Link>
              <Link to="/ladder" style={styles.link}>
                <Button variant="text" color='primary'>{texts[obj.Lang].NAVBAR_Ladder}</Button>
              </Link>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}></Typography>
            <SettingButton />
            {
              auth.currentUser ?
                <UserMenu />
                :
                <Link to="/login">
                  <Button color="primary" variant="contained">{texts[obj.Lang].NAVBAR_Entrar}</Button>
                </Link>
            }
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ bgcolor: 'background.paper', width: '100%', height:'100%', color: 'white'}}>
        <Container sx={{marginTop: 2}}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;