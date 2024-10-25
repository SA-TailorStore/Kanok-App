import { IFilterTab } from "@/components/OrderTab";

export const orderState = {
    pending: 'pending',
    payment: 'payment',
    waiting_assign: 'waiting_assign',
    processing_user: 'processing_user',
    received_tailor: 'received_tailor',
    processing_tailor: 'processing_tailor',
    success_tailor: 'success_tailor',
    received_shop: 'received_shop',
    checking_shop: 'checking_shop',
    fix_received_tailor: 'fix_received_tailor',
    fix_success_tailor: 'fix_success_tailor',
    fix_received_shop: 'fix_received_shop',
    fix_checking_shop: 'fix_checking_shop',
    received_user: 'received_user',
    fix_received_user: 'fix_received_user',
    success_user: 'success_user',
    fix_success_user: 'fix_success_user',
    cancel: 'cancel',
}

export const userOrderState: IFilterTab[] = [
    {
        title: 'รอการดำเนินการ',
        description: 'รอร้านค้าตอบรับคำสั่งซื้อ',
        status: ['pending'],
    },
    {
        title: 'ที่ต้องชำระ',
        description: 'รอการชำระเงิน',
        status: ['payment']
    },
    {
        title: 'กำลังดำเนินการ',
        description: 'ร้านค้ากำลังดำเนินการ',
        status: ['waiting_assign', 'processing_user', 'received_tailor', 'processing_tailor', 'success_tailor', 'received_shop', 'checking_shop', 'fix_received_tailor', 'fix_success_tailor', 'fix_received_shop', 'fix_checking_shop',]
    },
    {
        title: 'ที่ต้องได้รับ',
        description: 'สินค้ากำลังมาหาคุณ',
        status: ['received_user', 'fix_received_user']
    },
    {
        title: 'สำเร็จ',
        description: 'สินค้าถึงมือคุณแล้ว',
        status: ['success_user', 'fix_success_user']
    },
    {
        title: 'ยกเลิก',
        description: 'คำสั่งซื้อถูกยกเลิก',
        status: ['cancel']
    },
]

export const storeOrderState: IFilterTab[] = [
    {
        title: 'รอการดำเนินการ',
        description: 'รอแจ้งราคาสินค้า',
        status: ['pending']
    },
    {
        title: 'รอการชำระเงิน',
        description: 'รอลูกค้าชำระเงิน',
        status: ['payment']
    },
    {
        title: 'งานที่ยังไม่มอบหมาย',
        description: 'รอการมอบหมายงานให้ช่าง',
        status: ['waiting_assign']
    },
    {
        title: 'กำลังดำเนินการ',
        description: 'ช่างกำลังทำงาน',
        status: ['processing_user', 'received_tailor', 'processing_tailor', 'success_tailor']
    },
    {
        title: 'ที่ต้องได้รับ',
        description: 'สินค้ากำลังมาหาคุณ',
        status: ['received_shop']
    },
    {
        title: 'ที่กำลังจัดส่ง',
        description: 'สินค้ากำลังไปส่งให้ลูกค้า',
        status: ['recieiced_user',]
    },
    {
        title: 'สำเร็จ',
        description: 'สินค้าถึงมือลูกค้าแล้ว', 
        status: ['success_user']
    },
    {
        title: 'ยกเลิก',
        description: 'คำสั่งซื้อถูกยกเลิก',
        status: ['cancel']
    },
]

// export const tailorOrderState: IFilterTab[] = [
//     {
//         title: 'ที่ต้องได้รับ',
//         status: ['received_tailor']
//     },
//     {
//         title: 'กำลังดำเนินการ',
//         status: ['processing_tailor',]
//     },
//     {
//         title: 'พร้อมจัดส่ง',
//         status: ['success_tailor']
//     },
//     {
//         title: 'ที่กำลังจัดส่ง',
//         status: ['received_shop']
//     },
//     {
//         title: 'รอตวจสอบ',
//         status: ['received_shop']
//     },
//     {
//         title: 'สำเร็จ',
//         status: ['received_user', 'success_user']
//     },
//     {
//         title: 'ยกเลิก',
//         status: ['cancel']
//     },
// ]