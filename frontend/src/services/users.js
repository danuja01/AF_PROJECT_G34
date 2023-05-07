import { axiosInstance, apiRequest } from './core/axios'

export const getAllUsers = async (showLoader) => {
  // return await apiRequest(() => axiosInstance.get(`/api/items?page=${page}`), showLoader);
  return await apiRequest(() => axiosInstance.get('/users'), showLoader);
}

export const getUser = async (id, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/users/${id}`), showLoader);
}

export const createUser = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post("api/users", data), showLoader);
}

export const updateUser = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.patch("/users", data), showLoader);
}

export const deleteUser = async (id, userId, showLoader) => {
  return await apiRequest(() => axiosInstance.delete(`/users/${id}`, {data:{user_id: userId}}), showLoader);
}
