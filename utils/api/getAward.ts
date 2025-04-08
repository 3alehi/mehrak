import axios, { AxiosResponse } from 'axios';

const baseURL =process.env.NEXT_PUBLIC_API_URL; 

export const getAward = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${baseURL}/awards?page=1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error; 
  }
};
