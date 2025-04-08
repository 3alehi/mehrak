import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';
import toast from 'react-hot-toast';

export async function createCheckoutSession() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.post(`${API_URL}/checkout`, {

    }, {
        headers: {
            
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenFromCookie()}`,
      },
    });

    if (response.data.success) {
        return response.data

    } else {
      console.error('Error creating checkout session:', response.data.message);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.data.message)
      

      // console.error('Axios error:', error.response?.data || error.message);
      // toast.error(error.response?.data.message)
    } else {
      console.error('Unknown error:', error);
    }
  }
}


