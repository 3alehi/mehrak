import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';
import { deleteCookie } from 'cookies-next/client';

export const fetchOrders = async (perPage: number, status: number) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(`${API_URL}/profile/orders`, {
      headers: {
        'Authorization': `Bearer ${getTokenFromCookie()}`,
      },
      params: {
        page: perPage,
        status: status,
      },
    });
    if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
      deleteCookie('token')
      window.location.href = '/login';

    }else{
      return response.data;

    }  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};