import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, headerTitleStyle, styles } from "@/utils/styles";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import PlusIcon from '@/assets/icons/plus';

export default function ChooseDesignUser() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: ''
        });
    }, []);
    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ marginTop: '15%', marginHorizontal: '5%' }}>
                <SetText size={24} type="bold">เลือกแบบของฉัน</SetText>
                <SetText size={16}>ทำการเพิ่มแบบของคุณละทำการกรอกข้อมูลเื้อผ้าโดยสามารถเพิ่มได้สูงสุด 5 รายการ</SetText>

                <TouchableOpacity style={[{ height: 100, marginTop: '8%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: colors.white }, styles.shadowCustom]}>
                    <PlusIcon />
                    <SetText size={16}>เพิ่มแบบของฉัน</SetText>
                </TouchableOpacity>
            </View>
        </WrapBackground>
    );
}