import OrderCardShop from "@/components/OrderCardShop";
import OrderTab, { IFilterTab } from "@/components/OrderTab";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { IOrder } from "@/types/IOrder";
import { orderState, storeOrderState } from "@/utils/orderState";
import { colors } from "@/utils/styles";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Order() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<string[]>(['pending']);
    const [orders, setOrders] = useState<IOrder[]>([]);

    const fetchOrders = async () => {
        await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/orders').then((res) => {
            if (res.status === 200) {
                setOrders(res.data.data);
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching orders');
        });
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'งานทั้งหมด',
        });
        const unsubscribe = navigation.addListener('focus', () => {
            fetchOrders();
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '100%' }}>
                <SetText type="bold" size={24} style={{ marginTop: 15, paddingHorizontal: '8%', marginBottom: 4 }}></SetText>
                <OrderTab output={setSelected} orders={orders} />
                {/* OrderCardList */}
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                    {orders.map((order: IOrder, index: number) => {
                        if (selected.includes(order.status) || (selected.includes('all') && ![orderState.cancel, orderState.fix_success_user, orderState.success_user].includes(order.status))) return (
                            <OrderCardShop key={index} order={order} />
                        )
                    })}
                </ScrollView>
            </View>
        </WrapBackground>
    );
}

