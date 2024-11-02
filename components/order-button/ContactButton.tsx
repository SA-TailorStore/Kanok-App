import { SetText } from "@/components/SetText";
import { colors } from "@/utils/styles";
import { Linking, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";


export function ContactButton({ phone_number, who }: { phone_number?: string, who?: string }) {
    return (
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone_number}`)} style={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lesspink, borderRadius: 999, paddingHorizontal: 10 }}>
            <Iconify icon="f7:phone-circle-fill" size={15} color={colors.mediumpink} />
            <SetText type="bold" color={colors.mediumpink}>ติดต่อ{who}</SetText>
        </TouchableOpacity>
    );
}
