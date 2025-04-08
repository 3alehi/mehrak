import axios from "axios";
import { getTokenFromCookie } from "../helper/getCooki";

interface CartItem {
  id: number;
  quantity: number;
}

const getProductsIdAndQuantity = (): CartItem[] => {
  const existingData = JSON.parse(localStorage.getItem("buyProduct") || "[]");
  return existingData.map((item: any) => ({
    id: item.id,
    quantity: item.quantity,
  }));
};
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const onSyncCart = async (): Promise<void> => {
  const token = getTokenFromCookie()

  const cartItems = getProductsIdAndQuantity();

  if (cartItems.length > 0) {
    const data = new FormData();

    cartItems.forEach((item, index) => {
      data.append(`items[${index}][quantity]`, item.quantity.toString());
      data.append(`items[${index}][id]`, item.id.toString());
    });

    try {
      const response = await axios.post(`${API_URL}/cart/sync`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        localStorage.removeItem("buyProduct");
        
      }
      return response.data
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  }
};
