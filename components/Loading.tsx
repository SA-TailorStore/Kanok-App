import { View, StyleSheet, Image } from "react-native";
import { SetText } from "./SetText";
import { colors } from "@/utils/styles";

export default function Loading({ visible, text='กำลังโหลด...' }: { visible: boolean, text?: string }) {
    if (!visible) return null;
    return (
        <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 999, backgroundColor: colors.black, opacity: 0.8  }}>
            <Image source={require('@/assets/images/loading2.gif')} style={{ width: 150, height: 150, marginBottom: 15 }} />
            <SetText color={colors.white} type='bold'>{text}</SetText>
        </View>
    )
}