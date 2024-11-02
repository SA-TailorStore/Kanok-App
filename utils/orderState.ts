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
    success_shop: 'success_shop',
    received_user: 'received_user',
    success_user: 'success_user',
    cancel: 'cancel',
}

export const userOrderState: IFilterTab[] = [
    {
        title: 'รอการดำเนินการ',
        description: 'รอร้านค้าตอบรับคำสั่งซื้อ',
        status: [orderState.pending],
    },
    {
        title: 'ที่ต้องชำระ',
        description: 'รอการชำระเงิน',
        status: [orderState.payment]
    },
    {
        title: 'กำลังดำเนินการ',
        description: 'ร้านค้ากำลังดำเนินการ',
        status: [orderState.waiting_assign, orderState.processing_user, orderState.received_tailor, orderState.processing_tailor, orderState.success_tailor, orderState.received_shop, orderState.success_shop]
    },
    {
        title: 'ที่ต้องได้รับ',
        description: 'สินค้ากำลังมาหาคุณ',
        status: [orderState.received_user]
    },
    {
        title: 'สำเร็จ',
        description: 'คำสั่งซื้อเสร็จสมบูรณ์',
        status: [orderState.success_user]
    },
    {
        title: 'ยกเลิก',
        description: 'คำสั่งซื้อถูกยกเลิก',
        status: [orderState.cancel]
    },
]

export const storeOrderState: IFilterTab[] = [
    {
        title: 'รอการดำเนินการ',
        description: 'รอแจ้งราคาสินค้า',
        status: [orderState.pending]
    },
    {
        title: 'รอการชำระเงิน',
        description: 'รอลูกค้าชำระเงิน',
        status: [orderState.payment]
    },
    {
        title: 'งานที่ยังไม่มอบหมาย',
        description: 'รอการมอบหมายงานให้ช่าง',
        status: [orderState.waiting_assign]
    },
    {
        title: 'กำลังดำเนินการ',
        description: 'ช่างกำลังทำงานให้คุณ',
        status: [orderState.processing_user, orderState.received_tailor, orderState.processing_tailor, orderState.success_tailor]
    },
    {
        title: 'ที่ต้องได้รับ',
        description: 'สินค้ากำลังมาหาคุณ',
        status: [orderState.received_shop]
    },
    {
        title: 'พร้อมจัดส่ง',
        description: 'รอการจัดส่งสินค้าให้ลูกค้า',
        status: [orderState.success_shop]
    },
    {
        title: 'ที่กำลังจัดส่ง',
        description: 'สินค้ากำลังไปส่งให้ลูกค้า',
        status: [orderState.received_user,]
    },
    {
        title: 'สำเร็จ',
        description: 'คำสั่งซื้อเสร็จสมบูรณ์', 
        status: [orderState.success_user]
    },
    {
        title: 'ยกเลิก',
        description: 'คำสั่งซื้อถูกยกเลิก',
        status: [orderState.cancel]
    },
]

export const tailorOrderState: IFilterTab[] = [
    {
        title: 'ที่ต้องได้รับ',
        status: [orderState.received_tailor],
        description: 'รอรับพัสดุจากร้าน'
    },
    {
        title: 'กำลังดำเนินการ',
        status: [orderState.processing_tailor],
        description: 'กำลังดำเนินการ'
    },
    {
        title: 'พร้อมจัดส่ง',
        status: [orderState.success_tailor],
        description: 'สินค้าพร้อมส่ง'
    },
    {
        title: 'ที่กำลังจัดส่ง',
        status: [orderState.received_shop],
        description: 'สินค้ากำลังไปส่งให้ร้าน'
    },
    {
        title: 'สำเร็จ',
        status: [orderState.success_shop, orderState.received_user, orderState.success_user],
        description: 'คำสั่งซื้อเสร็จสมบูรณ์'
    },
    {
        title: 'ยกเลิก',
        status: [orderState.cancel],
        description: 'คำสั่งซื้อถูกยกเลิก'
    },
]