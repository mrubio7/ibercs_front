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
    return axios.create({
        headers: {
            'Authorization': `Bearer ${auth.currentUser.accessToken}`
        }
    }).get(url, params)
    .catch(error => {
        console.error('Error in get_with_auth:', error);
        throw error;
    });
}

export const post_with_auth = (url, params) => {
    return axios.create({
        headers: {
            'Authorization': `Bearer ${auth.currentUser.accessToken}`
        }
    }).post(url, params)
    .catch(error => {
        console.error('Error in post_with_auth:', error);
        throw error;
    });
}

export const put_with_auth = (url, params) => {
    return axios.create({
        headers: {
            'Authorization': `Bearer ${auth.currentUser.accessToken}`
        }
    }).put(url, params)
    .catch(error => {
        console.error('Error in put_with_auth:', error);
        throw error;
    });
}