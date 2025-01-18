type FetchOptions = RequestInit & {
    headers?: Record<string, string>;
  };

export const privateApi = async (url, options: FetchOptions = {}): Promise<any> => {
    const token = localStorage.getItem('authToken');
  
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    const headers = { ...defaultHeaders, ...(options.headers || {}) };
  
    try {
      const response = await fetch(url, {
        ...options, 
        headers,          
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Błąd w privateApi:', error);
      throw error; 
    }
  };
  