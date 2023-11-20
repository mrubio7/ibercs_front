import axios from 'axios';

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
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }).put(url, params)
    .catch(error => {
        console.error('Error in put_with_auth:', error);
        throw error;
    });
}