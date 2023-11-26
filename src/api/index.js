import { basic_get, basic_post, get_with_auth, post_with_auth } from '../utils/axios'
import { api_endpoints } from '../utils/const';

const Api = {
    Account: {
        new: (email, username, password, invitation, image) => {
            return basic_post(api_endpoints.account.new, { "email":email, "username":username, "password":password, "invitation":invitation, "image":image.toString() });
        },
        isFreeUsername: (username) => {
            return basic_post(api_endpoints.account.isFreeUsername, {"username":username });
        },
        recoverPassword: (email) => {
            return basic_post(api_endpoints.account.recoverPassword, {"email":email });
        },
    },
    Thread: {
        new: (lang, title, user,desc) => {
            return post_with_auth(api_endpoints.thread.new, { "lang":lang, "title":title, "user":String(user), "desc": desc });
        },
        getLatest: () => {
            return basic_get(api_endpoints.thread.getLatest);
        },
        get: (id) => {
            return get_with_auth(api_endpoints.thread.get+"?thread_id="+id);
        },
    },
    Post: {
        new: (lang, desc, user, thread_id) => {
            return post_with_auth(api_endpoints.post.new, { "lang":lang, "desc":desc, "user":String(user), "thread_id":String(thread_id) });
        },
    },
    User: {
        getImageByEmail: (email) => {
            return get_with_auth(api_endpoints.user.getImageByEmail+"?email="+email);
        },
        getUserByEmail: (username) => {
            return get_with_auth(api_endpoints.user.getUserByEmail+"?email="+username);
        },
    },
    Players: {
        getPlayersOrderedByElo: () => {
            return get_with_auth(api_endpoints.players.getPlayersOrderedByElo);
        }
    }
}

export default Api;