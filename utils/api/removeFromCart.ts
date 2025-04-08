import axios from "axios";
import { getTokenFromCookie } from "../helper/getCooki";

export const removeFromCart = async (id:number, quantity:number) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.post(
      `${API_URL}/cart/remove`,
      {
        id,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          "Content-Type": "application/json",
        },
      }
    );
return response.data
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};