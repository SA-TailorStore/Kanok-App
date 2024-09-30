import { SetText } from "@/components/SetText";
import { colors } from "@/utils/styles";
import { View } from "react-native";


export function ReceicedButton({ order_id }: { order_id: string }) {
    return (
        <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mediumpink, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 4 }}>
            <SetText type="bold" color={colors.white}>ฉันได้รับสินค้าแล้ว</SetText>
        </View>
    );
}
