
export const getListPublisher = async () => {
  const res = await fetch(`https://mehra.liara.run/api/v2/creators?page=1&per_page=100`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60000 }
  });
  return res.json();
};
