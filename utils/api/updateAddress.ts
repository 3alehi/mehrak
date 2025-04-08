import axios from "axios";
import { deleteCookie } from "cookies-next/client";
import { getTokenFromCookie } from "../helper/getCooki";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateAddress = async (
  addressId: string,
  data: any
): Promise<void> => {
  try {
    const response = await axios.put(
      `${API_URL}/profile/addresses/${addressId}`,
      data,
      {
        headers: {
            Authorization: `Bearer ${ getTokenFromCookie()}`,

          "Content-Type": "application/json",
        },
      }
    );
    // if(response.data.data.message === "این درخواست نیاز به ورود به سایت دارد."){
      
    //     deleteCookie('token')
    //     window.location.href = '/login';
  
    //   }else{
        return response.data;
  
    //   }
  } catch (error) {
    console.error("Failed to update address:", error);
  }
};
