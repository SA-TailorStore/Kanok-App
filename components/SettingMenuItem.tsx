import { SettingMenuProps } from "@/app/user-tab/account";
import { TouchableOpacity, View } from "react-native";
import { SetText } from "./SetText";
import { colors } from "@/utils/styles";
import { Iconify } from "react-native-iconify";

export default function SettingMenuItem({ item }: { item: SettingMenuProps }) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '100%' }} onPress={item.to}>
            {item.icon}
            <View style={{ flexDirection: 'column' }}>
                <SetText color={item.color} size={16} type="bold" style={{ marginBottom: -3 }}>{item.title}</SetText>
                <SetText color={colors.grey} type="small">{item.detail}</SetText>
            </View>
            <View style={{ position: 'absolute', right: 0 }}>
                <Iconify icon="weui:back-filled" size={16} color={colors.whereblack} style={[{ transform: [{ rotate: '180deg' }] }]} />
            </View>
        </TouchableOpacity>
    );
}