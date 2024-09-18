import { colors } from "@/utils/styles";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";

export default function CustomBackButton() {
    const navigation = useRouter();

    return (
        <TouchableOpacity onPress={() => navigation.back()} style={{ padding: 10 }}>
            <Iconify icon='weui:back-filled' size={30} color={colors.whereblack} />
        </TouchableOpacity>
    )
}