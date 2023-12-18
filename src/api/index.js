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
            return basic_get(api_endpoints.thread.get+"?thread_id="+id);
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
        update: (user_email, image, username) => {
            return post_with_auth(api_endpoints.user.update, { "user_email":user_email, "image": image.toString(), "username":username });
        }
    },
    Players: {
        getPlayersOrderedByElo: () => {
            return basic_get(api_endpoints.players.getPlayersOrderedByElo);
        }
    },
    Matches: {
        getAllMatches: () => {
            return basic_get(api_endpoints.matches.getAllMatches);
        },
        getMatchByThreadId: (threadId) => {
            return basic_get(api_endpoints.matches.getByThreadId+"?thread_id="+threadId);
        },
    },
    Teams: {
        new: (teamUrl, name) => {
            return post_with_auth(api_endpoints.teams.new, { "faceit_team_url":teamUrl, "name":name });
        },
        getAll: () => {
            return basic_get(api_endpoints.teams.getAll);
        }
    }
}

export default Api;