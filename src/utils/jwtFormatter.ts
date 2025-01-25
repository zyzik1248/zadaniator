interface JWTPayload {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    role: string;
    username: string;
    email: string;
}

export const decodeJWT = (): JWTPayload | null => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

export const isUserAdmin = (): boolean => {
    const user = decodeJWT();
    return user?.role === 'admin' || false;
};

export const getUserData = (): Partial<JWTPayload> | null => {
    const user = decodeJWT();
    if (!user) return null;
    
    return {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role
    };
};
  