import axios from "axios";

const mainUrl = "https://h6hwgp2ek4zzm3wt5tslqx4gki0xjzkv.lambda-url.us-east-1.on.aws";

// New endpoints
const NEW_ENDPOINTS = {
  getAllPosts: "/posts", //TODO: POST, PUT
};

export const postService = axios.create({
  baseURL: `${mainUrl}/posts`,
});

export const tagService = axios.create({
  baseURL: `${mainUrl}/tags`,
});
