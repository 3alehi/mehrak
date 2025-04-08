import axios from "axios";
import { getTokenFromCookie } from "../helper/getCooki";

export const likeCollection = async (id: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.post(
        `${API_URL}/collection/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`, // Bearer token in the header
          },
        }
      );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error unliking collection:", error.response?.data || error.message);
      throw error.response?.data || error;
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
