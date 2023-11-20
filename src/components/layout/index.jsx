import { Box, Container, AppBar, Typography, Button, Toolbar, Avatar, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { texts } from '../../utils/translate';
import SwitchLang from './switchLang';
import Context, { ContextProvider } from '../../context';

const styles = {
  link:{
    margin: '0 10px',
  }
}

const Layout = ({ children }) => {
  const obj = useContext(Context);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Avatar alt="logo" src="/images/ibercs.png" variant='square' sx={{ width: 56, height: 56 }} />
            <Box sx={{marginLeft: 10}}>
              <Link to="/" style={styles.link}>
                <Button variant="outlined">{texts[obj.Lang].NAVBAR_Inicio}</Button>
              </Link>
              <Link to="/forum" style={styles.link}>
                <Button variant="outlined">{texts[obj.Lang].NAVBAR_Forum}</Button>
              </Link>
              <Link to="/ladder" style={styles.link}>
                <Button variant="outlined">{texts[obj.Lang].NAVBAR_Ladder}</Button>
              </Link>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}></Typography>

            <SwitchLang lang={obj.Lang} setLang={obj.setLang} />
            <Link href="/login">
              <Button color="primary" variant="contained">{texts[obj.Lang].NAVBAR_Entrar}</Button>
            </Link>
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