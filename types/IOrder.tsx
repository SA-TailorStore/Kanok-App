import { IUser } from "./IUser";

export type IOrder = {
    order_id: string;
    status: string;
    is_payment: string
    store_phone: string;
    store_address: string;
    user_phone: string,
    user_address: string;
    price: number;
    due_date: string;
    tracking_number: string;
    tailor_id: string;
    created_by: IUser | any; // แก้กลับเมื่อเชื่อ database ได้แล้ว
    timestamp: string;
}