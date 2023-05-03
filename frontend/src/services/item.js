import { axiosInstance, apiRequest } from './core/axios'

export const getAll = async (page = 0, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/items?page=${page}`), showLoader);
}

export const get = async (id, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/items/id/${id}`), showLoader);
}

export const find = async (query, by = "name", page = 0, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/items?${by}=${query}&page=${page}`), showLoader);
}

export const createReview = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post("/api/items/review", data), showLoader);
}

export const updateReview = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.put("/api/items/review", data), showLoader);
}

export const deleteReview = async (id, userId, showLoader) => {
  return await apiRequest(() => axiosInstance.delete(`/api/items/review?id=${id}`, {data:{user_id: userId}}), showLoader);
}

export const getCuisines = async (showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/items/cuisines`), showLoader);
}
