import Env from "./Env";

export const API_URL = Env.API_URL + "/api";
export const LOGIN_URL = API_URL + "/auth/login";
export const REGISTER_URL = API_URL + "/auth/register";
export const CHECK_CREDENTIALS = API_URL + "/auth/checkCredentials";
export const LOGOUT_URL = API_URL + "/auth/logout";
export const POST_URL = API_URL + "/post";
export const SEARCH_URL = API_URL + "/search";
export const COMMENT_URL = API_URL + "/comment";
export const USER_POST_URL = API_URL + "/user/posts";
