import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';
import { deleteCookie } from 'cookies-next/client';

export const fetchMessages = async (): Promise<any> => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(`${API_URL}/profile/messages`, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`, 
      },
    });
    if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
      deleteCookie('token')
      window.location.href = '/login';

    }else{
      return response.data;

    }  } catch (error) {
    console.error('Error fetching messages:', error);
    return null;
  }
};