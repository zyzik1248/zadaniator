import { privateApi } from './privateApi.ts';
import { IUser } from '../types.ts';

export const getUsers = async (): Promise<IUser[]> => {
    try {
        const response = await privateApi('/api/users/');
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const deleteUser = async (userId: number): Promise<void> => {
    try {
        await privateApi(`/api/users/${userId}/`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};