import axios, { AxiosResponse } from 'axios';

const baseURL =process.env.NEXT_PUBLIC_API_URL; 

export const getDetaileAward = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${baseURL}/awards/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error; 
  }
};
