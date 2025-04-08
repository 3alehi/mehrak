import axios, { AxiosResponse } from 'axios';

const baseURL =process.env.NEXT_PUBLIC_API_URL; 

export const getCreator = async (CollectionId: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${baseURL}/creators/${CollectionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error; 
  }
};
