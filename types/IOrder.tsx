import { IUser } from "./IUser";

export type IOrder = {
    order_id: string;
    status: 'pending' | 'payment' | 'processing' | 'receiced' | 'success' | 'cancel';
    user_phone: string;
    store_phone: string;
    user_address: string;
    store_address: string;
    tracking_number: string;
    created_at: Date;
    created_by: IUser | any; // แก้กลับเมื่อเชื่อ database ได้แล้ว
}