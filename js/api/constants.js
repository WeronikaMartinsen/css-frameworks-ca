export const API_BASE_URL = "https://api.noroff.dev/api/v1/social";
export const REGISTER = "/auth/register";
export const LOGIN = "/auth/login";
export const POSTS = "/posts";
export const PROFILES = "/profiles";
export const MEDIA = "/media";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

export const id = params.get("id");

export const authorName = params.get("author");
