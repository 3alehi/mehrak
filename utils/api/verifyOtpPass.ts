import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const verifyOtpPass = async (code: string , Token:string) => {
  try {

   

    const response = await axios.post(
      `${API_URL}/password/verify-otp`,
      { code }, 
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: 'application/json',
        },
      }
    );

 
      return response.data;

     } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error verifying OTP: " + error.message);
    }
    throw new Error("Unknown error occurred while verifying OTP");
  }
};
