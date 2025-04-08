import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';
import { deleteCookie } from 'cookies-next/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AddressData {
  first_name: string;
  last_name: string;
  address: string;
  state_id: number;
  city_id: number;
  postal_code: string;
  mobile: string;
  phone: string;
  for_me: boolean;
}

export const sendAddressData = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/profile/addresses`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenFromCookie()}`,
      },
    });
    if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
      deleteCookie('token')
      window.location.href = '/login';

    }else{
      return response.data;

    }  } catch (error) {
    console.error('Error sending address data:', error);
    throw error; 
  }
};
