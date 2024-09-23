import { View } from "react-native";
import WrapBackground from "./WrapBackground";
import { colors } from "@/utils/styles";
import { SetText } from "./SetText";

export default function WrapManageDesign({ page, children }: { page: 'add design' | 'order' | 'order success', children: React.ReactNode }) {
    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ paddingTop: '15%', paddingHorizontal: '5%' }}>
                <View style={{ flexDirection: 'row', gap: 25, alignSelf: 'center', marginBottom: 15 }}>
                    <View style={{ gap: 5, alignItems: 'center' }}>
                        <SetText type='bold' color={page === 'add design'? colors.whereblack : colors.grey}>add design</SetText>
                        <View style={{ borderWidth: 4, borderRadius: 999, width: 60, borderColor: page === 'add design' ? colors.mediumpink : colors.grey }} />
                    </View>
                    <View style={{ gap: 5, alignItems: 'center' }}>
                        <SetText type='bold' color={page === 'order'? colors.whereblack : colors.grey}>order</SetText>
                        <View style={{ borderWidth: 4, borderRadius: 999, width: 60, borderColor: page === 'order' ? colors.mediumpink : colors.grey }} />
                    </View>
                    <View style={{ gap: 5, alignItems: 'center' }}>
                        <SetText type='bold' color={page === 'order success'? colors.whereblack : colors.grey}>order success</SetText>
                        <View style={{ borderWidth: 4, borderRadius: 999, width: 60, borderColor: page === 'order success' ? colors.mediumpink : colors.grey }} />
                    </View>
                </View>
                {children}
            </View>
        </WrapBackground>
    )
}