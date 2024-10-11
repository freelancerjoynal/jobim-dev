 async function clientFetchData(url, cache) {
    try {
      const response = await fetch(`http://localhost:8000/api${url}` , cache );
      
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
  