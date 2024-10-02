import { SetText } from "@/components/SetText";
import { colors } from "@/utils/styles";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";


export function PaymentButton({ order_id }: { order_id: string }) {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={()=>router.push(`/user-stack/payment/${order_id}`)} style={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mediumpink, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 4 }}>
            <SetText type="bold" color={colors.white}>ชำระเงิน</SetText>
        </TouchableOpacity>
    );
}