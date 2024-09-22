import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, headerTitleStyle, styles } from "@/utils/styles";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, ScrollView } from "react-native";

export default function ProductDetail() {
    const navigation = useNavigation();
    const [selectedTag, setSelectedTag] = useState<number>(0);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: ''
        });
    }, []);
    return (
        <WrapBackground color={colors.backgroundColor}>
            <Image source={require('@/assets/images/example_girl_bag.png')} style={{width: '100%', height: '60%', marginBottom: '-10%'}} />
            <ScrollView contentContainerStyle={[{ paddingBottom: 20, height: '100%', borderTopLeftRadius: 51, borderTopRightRadius: 51, backgroundColor: colors.backgroundColor, marginTop: 1 }, styles.shadowCustom3]}>
                <View style={{ marginTop: '8%', marginHorizontal: '10%' }}>
                    <SetText size={24} type="bold">เลือกแบบที่ต้องการ</SetText>
                    <SetText size={16}>เลือกแบบที่ตุณต้องการ</SetText>
                </View>
            </ScrollView>
        </WrapBackground>
    );
}