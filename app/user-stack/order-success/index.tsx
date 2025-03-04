import { SetText } from "@/components/SetText";
import WrapManageDesign from "@/components/WrapManageDesign";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { TouchableOpacity, View, Image } from "react-native";
export default function OrderSuccess() {
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "คำสั่งซื้อสำเร็จ",
            headerLeft: () => <View></View>
        });
    }, []);

    const onBacktoMainButton = () => {
        router.dismissAll();
        router.replace('/user-tab/home');
    }

    const onGotoOrderButton = () => {
        router.dismissAll();
        router.replace('/user-tab/order');
    }

    return (
        <>
            <WrapManageDesign page='order success'>
                <View style={{ height: '80%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('@/assets/images/thanks for order.png')} />
                    <SetText type='bold' size={24} style={{ marginTop: 15 }}>ทำการสั่งซื้อสำเร็จ</SetText>
                    <SetText color={colors.grey} size={16}>ขอบคุณสำหรับการสั่งซื้อ</SetText>
                </View>
            </WrapManageDesign>
            <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 150, justifyContent: 'center', paddingVertical: '10%', paddingHorizontal: '5%', zIndex: 90, gap: 10 }}>
                <TouchableOpacity onPress={onGotoOrderButton} style={[{ backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white}>ดูคำสั่งซื้อ</SetText>
                </TouchableOpacity>
                <TouchableOpacity onPress={onBacktoMainButton} style={[{ paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' }]}>
                    <SetText size={16} type="bold" color={colors.whereblack}>กลับสู่หน้าหลัก</SetText>
                </TouchableOpacity>
            </View>
        </>
    );
}