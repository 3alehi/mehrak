export const setToken = (token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7); // 7 روز اضافه می‌شود
  document.cookie = `token=${token}; path=/; Secure; Expires=${expires.toUTCString()}`;
};
