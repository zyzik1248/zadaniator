export const decodeJWT =()=> {
    const token = localStorage.getItem('authToken');

    if(!token){
        return
    }
    const [header, payload, signature] = token.split('.');
  
    function base64UrlDecode(base64Url) {
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      const padding = base64.length % 4;
      if (padding) {
        base64 += '='.repeat(4 - padding);
      }
      
      const decoded = atob(base64);
      return decoded;
    }
  
    const decodedPayload = base64UrlDecode(payload);
    
    const payloadObject = JSON.parse(decodedPayload);
  
    return payloadObject;
  }
  