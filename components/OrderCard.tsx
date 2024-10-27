import { IOrder } from "@/types/IOrder";
import { TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import { SetText } from "./SetText";
import { colors } from "@/utils/styles";
import { PendingButton } from "./order-button/PendingButton";
import { PaymentButton } from "./order-button/PaymentButton";
import { useRouter } from "expo-router";
import { ReceivedButton } from "./order-button/ReceivedButton";
import { orderState, userOrderState } from "@/utils/orderState";
import { ContactButton } from "./order-button/ContactButton";

export default function OrderCard({ order }: { order: IOrder }) {
    const router = useRouter();
    const status = {
        pending: <ContactButton phone_number={order.store_phone} who="ร้านค้า" />,
        payment: <PaymentButton order_id={order.order_id} />,
        processing: <ContactButton phone_number={order.store_phone} who="ร้านค้า" />,
        received: <ReceivedButton order_id={order.order_id} />,
        success: undefined,
        cancel: undefined
    } as { [key: string]: JSX.Element | undefined };
    return (
        <TouchableOpacity disabled={order?.status === orderState.cancel} onPress={() => router.push(`/user-stack/order-detail/${order.order_id}`)} style={{ flexDirection: 'row', height: 90, width: '100%', borderBottomWidth: 0.5, borderColor: colors.grey, paddingBottom: 15, paddingHorizontal: 15, marginTop: 10, opacity: order?.status === orderState.cancel ? 0.5 : 1 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ height: '100%', marginRight: 6 }}>
                    <Iconify icon="mdi:clothes-hanger" size={18} color={colors.mediumpink} />
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <SetText type='bold' size={14}>หมายเลขคำสั่งซื้อ #{order.order_id}</SetText>
                    </View>
                    <SetText color={colors.grey}>7 พ.ย. 27, 14:41</SetText>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', position: 'absolute', bottom: 0, width: '100%' }}>
                        <SetText type='bold' color={colors.mediumpink}>{
                            userOrderState.find((item) => item.status.includes(order.status))?.description
                        }</SetText>
                        {/* <SetText type="bold" color={colors.mediumpink}>{status[order.status]}</SetText> */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}