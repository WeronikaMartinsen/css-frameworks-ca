export const API_BASE_URL = "https://api.noroff.dev";
export const API_BASE = "/api/v1";
export const API_SOCIAL_BASE = "/social";
export const API_LOGIN = "/auth/login";
export const API_PROFILES = "/profiles";
export const API_POSTS = "/posts";
export const API_MEDIA = "/media";
export const API_SOCIAL_URL = `${API_BASE_URL}${API_BASE}${API_SOCIAL_BASE}`;

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

export const id = params.get("id");

export const author = params.get("author");
