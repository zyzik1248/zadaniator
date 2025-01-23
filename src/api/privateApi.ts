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

    if (response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : null;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
