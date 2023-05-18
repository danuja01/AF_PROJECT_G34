import { axiosInstance, apiRequest } from './core/axios'

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
  return await apiRequest(() => axiosInstance.get(`/api/posts/search?searchQuery=${searchQuery || 'none'}`), showLoader)
}

/*export const fetchPostsBySearch = async (searchQuery) => {
    return await apiRequest(() => axiosInstance.get(`/api/posts/search`, { params: searchQuery }));
  };
  */

export const searchPost = async (term, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/posts/search/${term}`), showLoader)
}
