import { FormInput } from "@/components/FormInput";
import OrderCardShop from "@/components/OrderCardShop";
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

export default function OrderSearch() {
    const navigation = useNavigation();
    const router = useRouter();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [value, setValue] = useState<string>('');
    const { tokenContext } = useSession();

    const fetchOrders = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/user', {
            token: tokenContext,
        }).then((res) => {
            if (res.status === 200) {
                setOrders(res.data.data);
                console.log(res.data.data)
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching orders');
        });
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerLeft: () => <TouchableOpacity onPress={() => router.back()}><Iconify icon="iconamoon:close-bold" size={24} color={colors.whereblack} /></TouchableOpacity>,
        });
        const unsubscribe = navigation.addListener('focus', () => {
            fetchOrders();
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        console.log(value);
    }, [value]);

    const searchOrders = orders.filter((order: IOrder) => {
        return order.order_id.includes(value) 
    });

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '100%', marginTop: '10%', paddingHorizontal: 20 }}>
                <FormInput iconHeader={<Iconify icon="mingcute:search-line" size={24} color={colors.grey} />} value={value} onChange={(e) => setValue(e.nativeEvent.text)} placeholder="ค้นหา" />
                <ScrollView contentContainerStyle={{ paddingBottom: 200, paddingTop: 20 }}>
                    {searchOrders.map((order: IOrder, index: number) => {
                        return <OrderCardShop key={index} order={order} />
                    })}
                </ScrollView>
            </View>
        </WrapBackground>
    );
}