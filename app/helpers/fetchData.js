export async function fetchData(url, cache) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseUrl}${url}`, cache);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // If data is paginated, extract the 'data' array
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
