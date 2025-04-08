import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';
import { deleteCookie } from 'cookies-next/client';

async function getOrderByID(id: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(
      `${API_URL}/checkout/factor/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${getTokenFromCookie()}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
      deleteCookie('token')
      window.location.href = '/login';

    }else{
      return response.data.data;

    }
  } catch (error) {
    console.error("Error:", error);
        throw error; 
}
}
export default getOrderByID;
