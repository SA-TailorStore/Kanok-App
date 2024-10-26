import { SetText } from "@/components/SetText";
import { colors } from "@/utils/styles";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export function ShippingTailorButton({ order_id }: { order_id: string }) {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push(`/tailor-stack/tracking_number/${order_id}`)} style={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.nopink, opacity: 0.7,borderRadius: 8, padding: 8, borderColor: colors.mediumpink, borderWidth: 1 }}>
            <SetText type="bold" size={12} color={colors.mediumpink}>แจ้งจัดส่งพัสดุ</SetText>
        </TouchableOpacity>
    );
}
