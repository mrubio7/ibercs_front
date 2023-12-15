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
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper'}}>
        <AppBar position="static" elevation={0} variant='outlined' sx={{background: 'linear-gradient(0deg, rgba(255,136,0,0.0) 0%, rgba(0,0,0,0) 100%)', marginBottom: 4 }} >
          <Toolbar variant='dense'>
            <Link to="/">
              <Avatar alt="logo" src="/images/ibercs.png" variant='square' sx={{ width: 56, height: 56 }} />
            </Link>
            <Box sx={{marginLeft: 5}}>
              <Link to="/" style={styles.link}>
                <Button variant="text" color='primary'>{texts[obj.Lang].NAVBAR_Inicio}</Button>
              </Link>
              <Link to="/matches" style={styles.link}>
                <Button variant="text" color='primary'>{texts[obj.Lang].NAVBAR_Matches}</Button>
              </Link>
              {/* <Link to="/forum" style={styles.link}>
                <Button variant="text" color='primary'>{texts[obj.Lang].NAVBAR_Forum}</Button>
              </Link> */}
              <Link to="/ladder/teams" style={styles.link}>
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
          <Box sx={{ bgcolor: 'background.paper', width: '100%', height:'100%', color: 'white'}}>
            <Container sx={{marginTop: 2, height: '100%'}}>
              {children}
              <Box sx={{position: 'absolute', right: 0, bottom: 0, marginRight: '20px', marginBottom: '20px', fontSize: '0.6em'}}>
                v1.0.0
              </Box>
            </Container>
        </Box>
      </Box>
    </>
  );
};

export default Layout;