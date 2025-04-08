import axios from "axios";
import { getTokenFromCookie } from "../helper/getCooki";
import { deleteCookie } from "cookies-next/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCollections = async () => {
    const token = getTokenFromCookie();
    if (token) {

    try {
        const response = await axios.get(`${API_URL}/profile/collections/me`, {
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
}

};

