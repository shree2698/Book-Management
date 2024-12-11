import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://64.227.142.191:8080/application-test-v1.1',
});

export const fetchBooksAPI = async (params) => {
  const response = await api.get(`/books`, { params });
  return response.data.data;
};

export const addBookAPI = async (book) => {
  const response = await api.post(`/books`, book);
  return response.data;
};
