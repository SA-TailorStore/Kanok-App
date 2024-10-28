import OrderCard from "@/components/OrderCard";
import OrderTab from "@/components/OrderTab";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useSession } from "@/contexts/SessionContext";
import { IOrder } from "@/types/IOrder";
import { orderState } from "@/utils/orderState";
import { colors } from "@/utils/styles";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";

export default function OrderPage() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<string[]>(['pending']);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const { tokenContext } = useSession();
    const router = useRouter();

    const fetchOrders = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/user', {
            token: tokenContext,
        }).then((res) => {
            if (res.status === 200) {
                setOrders(res.data.data);
                // console.log(res.data.data)
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching orders');
        });
    }

    useEffect(() => {
        fetchOrders();
        const unsubscribe = navigation.addListener('focus', () => {
            setInterval(() => {
                fetchOrders();
            }, 3000);
        });
        
        return unsubscribe;
    }, []);

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '100%' }}>
                <View style={{ marginTop: 15, paddingHorizontal: '8%', marginBottom: 4, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <SetText type="bold" size={24}>My Order</SetText>
                    <TouchableOpacity onPress={()=>router.push('/user-stack/order-search')}><Iconify icon="mingcute:search-line" size={24} color={colors.mediumpink} /></TouchableOpacity>
                </View>
                <OrderTab output={setSelected} orders={orders} />
                {/* OrderCardList */}
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                    {orders.map((order: IOrder, index: number) => {
                        if (selected.includes(order.status) || (selected.includes('all') && ![orderState.cancel, orderState.success_user].includes(order.status))) return (
                            <OrderCard key={index} order={order} />
                        )
                    })}
                </ScrollView>
            </View>
        </WrapBackground>
    );
}

