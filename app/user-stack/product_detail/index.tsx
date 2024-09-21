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
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{ marginTop: '15%', marginHorizontal: '5%' }}>
                    <SetText size={24} type="bold">เลือกแบบที่ต้องการ</SetText>
                    <SetText size={16}>เลือกแบบที่ตุณต้องการ</SetText>
                </View>
                
            </ScrollView>
        </WrapBackground>
    );
}