import axios, { AxiosResponse } from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';

const baseURL =process.env.NEXT_PUBLIC_API_URL; 

export const getCollectionById = async (CollectionId: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${baseURL}/collections/${CollectionId}`, {
      headers: {
        'Authorization': `Bearer ${getTokenFromCookie()}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error; 
  }
};
