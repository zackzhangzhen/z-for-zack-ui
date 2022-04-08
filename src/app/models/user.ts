export interface User{
        _id?: string;
        name: string;
        password: string;
        likes: number;
        level: number;
        credits: number;
        vip: boolean;
        admin: boolean;
}