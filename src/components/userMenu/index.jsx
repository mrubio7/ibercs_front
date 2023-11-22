import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Avatar, Menu, MenuItem, Tooltip, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebaseLogout } from '../../hooks/useFirebaseLogout';
import Context from '../../context';
import { texts } from '../../utils/translate';
import { auth } from '../../utils/firebase';
import Api from '../../api';

const UserMenu = () => {
    const [image, setImage] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const logout = useFirebaseLogout();
    const navigate = useNavigate();
    const obj = useContext(Context);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        await logout();
        navigate("/")
        localStorage.removeItem("access_token");
    }

    useEffect(() => {
        const getImage = async () => {
          if (!auth.currentUser?.email) return;
          const data = await Api.User.getImageByEmail(auth.currentUser?.email);
          setImage(data.data.success);
        }
        
        getImage();
      }, []);
      
      useEffect(() => {
        
      }, [image]);

    return (
        <Box sx={{ flexGrow: 0, marginRight: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar variant='circular' src={`data:image/jpeg;base64,${image}`} sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', border: '1px solid #EEE'}} />
              </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
            <MenuItem onClick={handleCloseUserMenu} disabled>
                {auth.currentUser?.displayName}
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
                <Link to='/profile'>
                    <Typography color={'secondary'}>{texts[obj.Lang].NAVBAR_USERMENU_Profile}</Typography>
                </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
                <Link onClick={handleLogout}>
                    <Typography color={'primary'}>{texts[obj.Lang].EXIT}</Typography>
                </Link>
            </MenuItem>
           
            </Menu>
        </Box>
    )
}

export default UserMenu;