import axios from 'axios';
import { deleteCookie } from 'cookies-next/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendOtp = async (mobile: string) => {
  const response = await axios.post(`${API_URL}/otp`, { mobile });
  if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
    deleteCookie('token')
    window.location.href = '/login';

  }else{
    return response.data;

  }};
