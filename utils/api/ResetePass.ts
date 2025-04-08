export const resetPassword = async (password: string, confirmPassword: string, token: string): Promise<any> => {
  try {
    if (password !== confirmPassword) {
      throw new Error("رمز عبور و تکرار آن یکسان نیستند");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
        password_confirmation: confirmPassword,
      }),
    });

    const data = await response.json(); // گرفتن دیتای API

    if (!response.ok) {
      throw new Error(data.message || "خطا در تغییر رمز عبور");
    }

    return data; // بازگشت پاسخ API
  } catch (error) {
    console.error("Reset Password Error:", error);
    return false;
  }
};
