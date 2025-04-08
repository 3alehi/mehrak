
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getHome = async () => {
  const res = await fetch(`${API_URL}/home`, {
    next: { revalidate: 3600 },
  });
  return res.json();
};