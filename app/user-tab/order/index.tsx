import OrderCard from "@/components/OrderCard";
import OrderTab from "@/components/OrderTab";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { IOrder } from "@/types/IOrder";
import { colors } from "@/utils/styles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Iconify } from "react-native-iconify";



const exampleOrder: IOrder[] = [
    {
        order_id: 'ord20241201-0001',
        status: 'pending',
        user_phone: '0812345678',
        store_phone: '0812345678',
        user_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        store_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        tracking_number: '1234567890',
        created_at: new Date(),
        created_by: "me"
    },
    {
        order_id: 'ord20241201-0001',
        status: 'payment',
        user_phone: '0812345678',
        store_phone: '0812345678',
        user_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        store_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        tracking_number: '1234567890',
        created_at: new Date(),
        created_by: "me"
    },
    {
        order_id: 'ord20241201-0001',
        status: 'receiced',
        user_phone: '0812345678',
        store_phone: '0812345678',
        user_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        store_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        tracking_number: '1234567890',
        created_at: new Date(),
        created_by: "me"
    },
    {
        order_id: 'ord20241201-0001',
        status: 'success',
        user_phone: '0812345678',
        store_phone: '0812345678',
        user_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        store_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        tracking_number: '1234567890',
        created_at: new Date(),
        created_by: "me"
    },
    {
        order_id: 'ord20241201-0001',
        status: 'cancel',
        user_phone: '0812345678',
        store_phone: '0812345678',
        user_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        store_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        tracking_number: '1234567890',
        created_at: new Date(),
        created_by: "me"
    },
    {
        order_id: 'ord20241201-0002',
        status: 'pending',
        user_phone: '0812345678',
        store_phone: '0812345678',
        user_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        store_address: '123 หมู่ 1 ต.อ่างทอง อ.เมือง จ.เชียงใหม่ 50000',
        tracking_number: '1234567890',
        created_at: new Date(),
        created_by: "me"
    },
];

export default function OrderPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string>('pending');

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '100%' }}>
                <SetText type="bold" size={24} style={{ marginTop: 15, paddingHorizontal: '8%', marginBottom: 4 }}>My Order</SetText>
                <OrderTab output={setSelected} />
                {/* OrderCardList */}
                <View style={{ width: '100%' }}>
                    {exampleOrder.map((order: IOrder, index: number) => {
                        if (order.status === selected) return (
                            <OrderCard key={index} order={order} />
                        )
                    })}
                </View>
            </View>
        </WrapBackground>
    );
}

