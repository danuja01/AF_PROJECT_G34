import { axiosInstance, apiRequest } from './core/axios'

//const url = 'http://localhost:5000/posts';

//const API = axios.create({ baseURL: 'http://localhost:4000' });


/*xport const fetchPosts = () => axios.get(url);
export const fetchPostsBySearch = (searchQuery) => axios.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);*/

//export const fetchPost = (id) => API.get(`/posts/${id}`);
//export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
//export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
//export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
//export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
//export const deletePost = (id) => API.delete(`/posts/${id}`);


export const createPost = async (newPost, showLoader) => {
    return await apiRequest(() => axiosInstance.post('/api/posts/', newPost), showLoader)
  }
  
  export const fetchPosts = async (page, showLoader) => {
    return await apiRequest(() => axiosInstance.get(`/api/posts?page=${page}`), showLoader)
  }
  
  export const fetchPost = async (id, showLoader) => {
    return await apiRequest(() => axiosInstance.get(`/api/posts/${id}`), showLoader)
  }
  
  export const updatePost = async (id, updatedPost, showLoader) => {
    return await apiRequest(() => axiosInstance.patch(`/api/posts/${id}`, updatedPost), showLoader)
  }
  
  export const deletePost = async (id, showLoader) => {
    return await apiRequest(() => axiosInstance.delete(`/api/posts/${id}`), showLoader)
  }
  
  /*export const fetchPostsBySearch = async (searchQuery, showLoader) => {
    return await apiRequest(() => axiosInstance.get(`/api/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`), showLoader)
  }*/

  export const fetchPostsBySearch = async (searchQuery, showLoader) => {
    return await apiRequest(() => axiosInstance.get(`/api/posts/search?searchQuery=${searchQuery.search || 'none'}`), showLoader)
  }
  
  /*export const fetchPostsBySearch = async (searchQuery) => {
    return await apiRequest(() => axiosInstance.get(`/api/posts/search`, { params: searchQuery }));
  };
  */

  export const searchPost = async (term, showLoader) => {
    return await apiRequest(() => axiosInstance.get(`/api/posts/search/${term}`), showLoader)
  }
  