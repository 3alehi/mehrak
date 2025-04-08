import axios from 'axios';
import { deleteCookie } from 'cookies-next/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendOtpForce = async (mobile: string, BEARER_TOKEN: string) => {
  
  try {
    const response = await axios.post(
      `${API_URL}/otp/force`,
      { mobile },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
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
    console.error('Error sending OTP request:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
    } else {
      console.error('Non-Axios error:', error);
    }
    
    throw new Error('Error sending OTP request');
  }
};
