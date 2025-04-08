import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';
import { deleteCookie } from 'cookies-next/client';

export const deleteCollection = async (collectionId: number) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.delete(`${API_URL}/collection/${collectionId}/like`, {
      headers: {
        'Authorization': `Bearer ${getTokenFromCookie()}`,
      },
    });
    if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
      deleteCookie('token')
      window.location.href = '/login';

    }else{
      return response.data;

    }  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting collection:', error.response?.data || error.message);
      throw error.response?.data || error; 
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
