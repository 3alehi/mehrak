import axios from 'axios';
import { deleteCookie } from 'cookies-next/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const VerifyOtp = async (code: string , Token:string) => {
  try {

   

    const response = await axios.post(
      `${API_URL}/verify`,
      { code }, 
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: 'application/json',
        },
      }
    );

    if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
      deleteCookie('token')
      window.location.href = '/login';

    }else{
      return response.data;

    }  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error verifying OTP: " + error.message);
    }
    throw new Error("Unknown error occurred while verifying OTP");
  }
};
