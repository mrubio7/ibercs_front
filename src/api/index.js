import { basic_get, basic_post } from '../utils/axios'
import { api_endpoints } from '../utils/const';

const Api = {
    Account: {
        new: (email, username, password) => {
            return basic_post(api_endpoints.account.new, { "email":email, "username":username, "password":password });
        },
        isFreeUsername: (username) => {
            return basic_post(api_endpoints.account.isFreeUsername, {"username":username });
        },
        recoverPassword: (email) => {
            return basic_post(api_endpoints.account.recoverPassword, {"email":email });
        },
    },
    Thread: {
        new: (lang, title_es, title_pt, user) => {
            return basic_post(api_endpoints.thread.new, { "lang":lang, "title_es":title_es, "title_pt":title_pt, "user":user.ToString() });
        },
        getLatest: () => {
            return basic_get(api_endpoints.thread.getLatest);
        }
    },
    Post: {
        new: (lang, desc_es, desc_pt, user, thread_id) => {
            return basic_post(api_endpoints.post.new, { "lang":lang, "desc_es":desc_es, "desc_pt":desc_pt, "user":user.ToString(), "thread_id":thread_id.ToString() });
        },
    }
}

export default Api;