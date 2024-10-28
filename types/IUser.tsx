
export type IUser = {
    user_id: string;
    username: string;
    display_name: string;
    password: string;
    phone_number: string;
    user_profile_url: string;
    role: string;
    address: string;
    created_at: number;
};

export type ITailor = IUser & {
    order_id: string;
    product_process: 0;
    product_total: 0;
}

export type UserResponse = {
    user_id: string;
    username: string;
    display_name: string;
    user_profile_url: string;
    role: 'user' | 'store' | 'tailor';
    phone_number: string;
    address: string;
    timestamp: string;
}