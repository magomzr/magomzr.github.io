import axios from "axios";
import { blogConfig } from "../config";

export const jwtService = axios.create({
  baseURL: blogConfig.jwtServiceUrl,
});

export const postMainService = axios.create({
  baseURL: blogConfig.postMainServiceUrl,
});

export const postByIdService = axios.create({
  baseURL: blogConfig.postByIdServiceUrl,
});

export const tagsService = axios.create({
  baseURL: blogConfig.tagsServiceUrl,
});

export const postByTagService = axios.create({
  baseURL: blogConfig.postByTagServiceUrl,
});

export const draftService = axios.create({
  baseURL: blogConfig.draftServiceUrl,
});

export const searchService = axios.create({
  baseURL: blogConfig.searchServiceUrl,
});

export const setAuthToken = (res) => {
  const token = res.body;
  if (token) {
    postMainService.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    postByIdService.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    tagsService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    postByTagService.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    draftService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    searchService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete postMainService.defaults.headers.common["Authorization"];
    delete postByIdService.defaults.headers.common["Authorization"];
    delete tagsService.defaults.headers.common["Authorization"];
    delete postByTagService.defaults.headers.common["Authorization"];
    delete draftService.defaults.headers.common["Authorization"];
    delete searchService.defaults.headers.common["Authorization"];
  }
};
