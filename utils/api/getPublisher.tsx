const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPublisher = async () => {
  const res = await fetch(`https://mehra.liara.run/api/v2/producers?page=1&per_page=30`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60000 }

  });
  return res.json();
};
