export async function search(query: string) {
    const url = `https://mehra.liara.run/api/v1/search?q=${encodeURIComponent(query)}&is_complete=0`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }