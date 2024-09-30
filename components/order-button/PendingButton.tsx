import { SetText } from "@/components/SetText";
import { colors } from "@/utils/styles";
import { View } from "react-native";
import { Iconify } from "react-native-iconify";


export function PendingButton({ order_id }: { order_id: string }) {
    return (
        <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lesspink, borderRadius: 999, paddingHorizontal: 10 }}>
            <Iconify icon="f7:phone-circle-fill" size={15} color={colors.mediumpink} />
            <SetText type="bold" color={colors.mediumpink}>ติดต่อร้าน</SetText>
        </View>
    );
}
