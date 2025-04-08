import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SendOtpForgetPass = async (mobile: string ) => {
  try {
    const response = await axios.post(
      `${API_URL}/password/forget`,
      { mobile },
   
    );
      
    

      return response.data;

      } catch (error) {
    throw new Error('Error sending OTP request');
  }
};
