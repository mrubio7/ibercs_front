import { createTheme } from '@mui/material/styles';

//const url_base = 'http://localhost:8080/api/v1';
const url_base = 'https://ibercs.onrender.com/api/v1'; 
export const api_endpoints = { 
    account: {
        new: `${url_base}/account/new`,
        isFreeUsername: `${url_base}/account/IsFreeUsername`,
        recoverPassword: `${url_base}/account/recover-password`,
    },
    thread: {
        new: `${url_base}/thread/new`,
        getLatest: `${url_base}/thread/get-latest`,
    },
    post: {
        new: `${url_base}/post/new`,
        
    },
    user: {
        getImageByEmail: `${url_base}/user/get-image-by-email`,
        getUserByEmail: `${url_base}/user/get-user-by-email`,
    },
    faceit: {
        login: `${url_base}/faceit/login`,
        callback: `${url_base}/faceit/callback`,
    }
}

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#d32f2f'
      },
      secondary: {
        main: '#5B5B5B',
      },
    }
  });
  
export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#d32f2f'
      },
      secondary: {
        main: '#5B5B5B',
      },
      white: {
        main: '#ffffff',
      },
    }
  });