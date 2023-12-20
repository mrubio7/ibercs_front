import { createTheme } from '@mui/material/styles';

//const url_base = 'http://localhost:8080/api/v1';
const url_base = 'https://api.ibercs.com/api/v1'; 
export const api_endpoints = { 
    account: {
        new: `${url_base}/account/new`,
        isFreeUsername: `${url_base}/account/IsFreeUsername`,
        recoverPassword: `${url_base}/account/recover-password`,
    },
    thread: {
        new: `${url_base}/thread/new`,
        getLatest: `${url_base}/thread/get-latest`,
        get: `${url_base}/thread/get`,
    },
    post: {
        new: `${url_base}/post/new`,
        delete: `${url_base}/post/delete`,
    },
    user: {
        getImageByEmail: `${url_base}/user/get-image-by-email`,
        getUserByEmail: `${url_base}/user/get-user-by-email`,
        update: `${url_base}/user/update`,
    },
    faceit: {
        login: `${url_base}/faceit/login`,
        callback: `${url_base}/faceit/callback`,
    },
    players: {
        getPlayersOrderedByElo: `${url_base}/player/get-all-by-elo`,
    },
    matches: {
        getAllMatches: `${url_base}/match/get-all`,
        getByThreadId: `${url_base}/match/get-by-thread-id`,
    },
    teams: {
        new: `${url_base}/team/new`,
        getAll: `${url_base}/team/get-all`,
    }
}

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#e58716'
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
        main: '#e58716',
      },
      white: {
        main: '#ffffff',
      },
    }
  });

export const version = 'v1.4.0';