import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';
import { deleteCookie } from 'cookies-next/client';

export const fetchCartAddress = async (address_id: number, shipping_id: number) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.post(
      `${API_URL}/cart/address`,
      {
        address_id: address_id,
        shipping_id: shipping_id,
      },
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.data.message === "این درخواست نیاز به ورود به سایت دارد.") {
      deleteCookie('token');
      window.location.href = '/login';
    } else {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching cart address:', error);
  }
};
