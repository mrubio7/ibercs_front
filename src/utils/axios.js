import axios from 'axios';
import { auth } from './firebase';

export const basic_get = (url, params) => {
    return axios.get(url, params)
        .catch(error => {
            console.error('Error in basic_get:', JSON.stringify(error));
            throw error;
        });
};

export const basic_post = (url, params) => {
    return axios.post(url, params)
        .catch(error => {
            console.error('Error in basic_post:', error);
            throw error;
        });
};

export const get_with_auth = (url, params) => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                axios.create({
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }).get(url, params)
                .then(response => resolve(response))
                .catch(error => {
                    console.error('Error in get_with_auth:', error);
                    reject(error);
                });
            } else {
                reject('No user logged in');
            }
        });
    });
}

export const post_with_auth = (url, params) => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                if (user.stsTokenManager && user.stsTokenManager.isExpired) {
                    user.getIdToken(true).then((token) => {
                        axios.create({
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }).post(url, params)
                        .then(response => resolve(response))
                        .catch(error => {
                            console.error('Error in post_with_auth:', error);
                            reject(error);
                        });
                    }).catch((error) => {
                        console.error('Error getting new token:', error);
                        reject(error);
                    });
                } else {
                    axios.create({
                        headers: {
                            'Authorization': `Bearer ${user.accessToken}`
                        }
                    }).post(url, params)
                    .then(response => resolve(response))
                    .catch(error => {
                        console.error('Error in post_with_auth:', error);
                        reject(error);
                    });
                }
            } else {
                reject('No user logged in');
            }
        });
    });
}

export const put_with_auth = (url, params) => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                axios.create({
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }).put(url, params)
                .then(response => resolve(response))
                .catch(error => {
                    console.error('Error in put_with_auth:', error);
                    reject(error);
                });
            } else {
                reject('No user logged in');
            }
        });
    });
}