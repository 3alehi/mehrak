import axios from "axios";
import { getTokenFromCookie } from "../helper/getCooki";

interface UpdateUserData {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  password?: string;  
  current_password?: string;
  confirm?: string;
}


interface UpdateUserResponse {
  success: boolean;
  data: {
    message: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const updateUser = async (
  userData: UpdateUserData
): Promise<UpdateUserResponse> => {  
  try {
    const response = await axios.post(
      `${API_URL}/me`,
      {
        first_name: userData.first_name,
        last_name: userData.last_name,
        gender: userData.gender,
        email: userData.email,
        password: userData.password,
        confirm: userData.confirm,
        current_password: userData.current_password
      },
      {
        headers: {
          'Authorization': `Bearer ${getTokenFromCookie()}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;  
  } catch (error: any) {
    throw error;
  }
};

export default updateUser;
