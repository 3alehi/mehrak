import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';
import { deleteCookie } from 'cookies-next/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAddress = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/addresses`, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },

    });
    if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
      deleteCookie('token')
      window.location.href = '/login';

    }else{
      return response.data;

    }
    
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Error fetching addresses';
    throw new Error(errorMessage);
  }
  
};
