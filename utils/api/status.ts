import axios from "axios";
import { getTokenFromCookie } from "../helper/getCooki";
import { deleteCookie } from "cookies-next/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getStatus = async () => {
  const token = getTokenFromCookie();
  if (!token) {
    throw new Error("No token found in cookie");
  }

  try {
    const response = await axios.get(`${API_URL}/profile/orders/status`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
      deleteCookie('token')
      window.location.href = '/login';

    }else{
      return response.data;

    }
  } catch (error: any) {
    console.error("Error fetching user data", error);
    throw new Error(error.response?.data?.message || error.message); 
  }
};

