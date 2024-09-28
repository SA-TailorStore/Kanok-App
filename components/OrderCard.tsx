import { IOrder } from "@/types/IOrder";
import { View } from "react-native";
import { Iconify } from "react-native-iconify";
import { SetText } from "./SetText";
import { colors } from "@/utils/styles";
import { PendingButton } from "./order-button/PendingButton";
import { PaymentButton } from "./order-button/PaymentButton";
import { ReceicedButton } from "./order-button/ReceicedButton";

export const status = {
    pending: <PendingButton />,
    payment: <PaymentButton />,
    receiced: <ReceicedButton />,
    success: undefined,
    cancel: undefined
}
export default function OrderCard({ order }: { order: IOrder }) {
    return (
        <View style={{ flexDirection: 'row', height: 90, width: '100%', borderBottomWidth: 0.5, borderColor: colors.grey, paddingBottom: 15, paddingHorizontal: 15, marginTop: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ height: '100%', marginRight: 6 }}>
                    <Iconify icon="mdi:clothes-hanger" size={20} color={colors.mediumpink} />
                </View>
                <View style={{ width: '95%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <SetText type='bold' size={14}>หมายเลขคำสั่งซื้อ #{order.order_id}</SetText>
                        <SetText type="bold" color={colors.mediumpink}>กำลังดำเนินการ</SetText>
                    </View>
                    <SetText color={colors.grey}>7 พ.ย. 27, 14:41</SetText>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', position: 'absolute', bottom: 0, width: '100%' }}>
                        <SetText type='bold' color={colors.mediumpink}>กำลังดำเนินการคำสั่งซื้อ</SetText>
                        <SetText type="bold" color={colors.mediumpink}>{status[order.status]}</SetText>
                    </View>
                </View>
            </View>
        </View>
    )
}