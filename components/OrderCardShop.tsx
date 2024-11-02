import { IOrder } from "@/types/IOrder";
import { TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import { SetText } from "./SetText";
import { colors } from "@/utils/styles";
import { PendingButton } from "./order-button/PendingButton";
import { useRouter } from "expo-router";
import { ReceivedButton } from "./order-button/ReceivedButton";
import { orderState, storeOrderState } from "@/utils/orderState";
import { ContactButton } from "./order-button/ContactButton";
import { AssignWorkButton } from "./order-button/AssignWorkButton";
import { formatDate } from "@/utils/formatDate";

export default function OrderCardShop({ order }: { order: IOrder }) {
    const router = useRouter();
    const status = {
        pending: <ContactButton phone_number={order.user_phone} who="ลูกค้า" />,
        payment: <ContactButton phone_number={order.user_phone} who="ลูกค้า" />,
        waiting_assign: <AssignWorkButton order_id={order.order_id} />,
        processing: <PendingButton order_id={order.order_id} />,
        received: <ReceivedButton order_id={order.order_id} />,
        success: undefined,
        cancel: undefined
    } as { [key: string]: JSX.Element | undefined };

    return (
        <TouchableOpacity disabled={order?.status === orderState.cancel} onPress={() => router.push(`/store-stack/order-detail/${order.order_id}`)} style={{ flexDirection: 'row', height: 90, width: '100%', borderBottomWidth: 0.5, borderColor: colors.grey, paddingBottom: 15, paddingHorizontal: 15, marginTop: 10, opacity: order?.status === orderState.cancel ? 0.5 : 1 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ height: '100%', marginRight: 6 }}>
                    <Iconify icon="mdi:clothes-hanger" size={18} color={colors.mediumpink} />
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <SetText type='bold' size={14}>หมายเลขคำสั่งซื้อ #{order.order_id}</SetText>
                    </View>
                    <SetText color={colors.grey}>{formatDate(order.timestamp)}</SetText>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', position: 'absolute', bottom: 0, width: '100%' }}>
                        <SetText type='bold' color={colors.mediumpink}>
                            {order.status === orderState.processing_user ? "รอส่งพัสดุให้ช่าง" : storeOrderState.find((item) => item.status.includes(order.status))?.description}
                        </SetText>
                        {/* <SetText type="bold" color={colors.mediumpink}>{status[order.status]}</SetText> */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}