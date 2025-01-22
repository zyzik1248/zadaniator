export const randomStringBase64 =(length: number)=> {
    return btoa(Math.random().toString(36).slice(2)).slice(0, length);
  }
    