import axios from 'axios';
import { BASE_URL } from '../constants/ApiConfig';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiCall = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params }); 
    return response.data; 
  } catch (error) {
    console.error('API Call Error:', error.response || error.message);
    throw error; 
  }
};

export const getVendors = async (filters = {}) => {
  const endpoint = '/vendors'; 
  try {
    const data = await apiCall(endpoint, filters); 
    return data; 
  } catch (error) {
    throw new Error('Failed to fetch vendors');
  }
};
