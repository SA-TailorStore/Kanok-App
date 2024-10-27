import { SetText } from "@/components/SetText";
import WrapManageDesign from "@/components/WrapManageDesign";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { IProduct } from "@/types/IProduct";
import ManageOrderCard from "@/components/ManageOrderCard";
import SettingMenuItem from "@/components/SettingMenuItem";
import { Iconify } from "react-native-iconify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/types/IUser";
import ConfirmOrderCard from "@/components/ComfirmOrderCard";
import { useSession } from "@/contexts/SessionContext";
import { ProductRequest } from "@/types/ProductRequest";
import axios from "axios";
import { useToast } from "@/contexts/ToastContext";

export default function ConfirmOrder() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const { userContext, productContext, setProductContext } = useSession();
    const { showToast } = useToast();
    const [buttonDelay, setButtonDelay] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "รายการสั่งตัด",
        });
        console.log(productContext);
    }, []);

    const onConfirmOrderButton = async () => {
        await uploadtoServer();
    }

    const uploadtoServer = async () => {
        setButtonDelay(true);
        const token = await AsyncStorage.getItem('@access_token');

        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/create', {
            token: token,
            products: productContext
        }).then((res) => {
            if (res.status === 201) {
                console.log('Products created');
                showToast('สั่งสินค้าสำเร็จ', `คุณได้ทำการสั่งสินค้าจำนวน ${productContext.length} รายการสำเร็จ`, 'success');
                setProductContext([])
                router.dismissAll();
                router.replace('/user-stack/order-success');
            } else if (res.status === 200) {
                showToast('สั่งสินค้าไม่เร็จ', `คุณได้ทำการสั่งสินค้าจำนวน ${productContext.length} รายการสำเร็จ`, 'success');
            }
        }).catch((err) => {
            showToast('เกิดข้อผิดพลาด', 'ไม่สามารถสั่งสินค้าได้ (err: product}', 'error');
            setButtonDelay(false);
        });
    }

    if (!userContext) return null;
    return (
        <>
            <WrapManageDesign page='order'>
                <View style={{ flexDirection: 'column', marginBottom: 15, gap: 10 }}>
                    <SetText type="bold" size={24}>ที่อยู่ในการจัดส่ง</SetText>
                    <SettingMenuItem item={
                        {
                            icon: <Iconify icon="bx:bx-map" size={30} color={colors.whereblack} />,
                            title: userContext.address.length > 35 ? userContext.address.substring(0, 35) + '...' : userContext.address,
                            detail: userContext.display_name + ' ' + userContext.phone_number,
                            to: () => router.push('/user-stack/my-address')
                        }
                    } />
                </View>
                <View style={{ height: '100%' }}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 450 }} showsVerticalScrollIndicator={false}>
                            {
                                productContext.map((item: ProductRequest, index: number) => (
                                    <ConfirmOrderCard item={item} setSelectedProduct={setSelectedProduct} key={index} />
                                ))
                            }
                        </ScrollView>
                    </GestureHandlerRootView>
                </View>
            </WrapManageDesign>
            <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', paddingHorizontal: '5%', zIndex: 90 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <SetText type="bold" size={16}>จำนวน</SetText>
                    <SetText type="bold" size={16}>{productContext.length} รายการ</SetText>
                </View>
                <TouchableOpacity disabled={buttonDelay} onPress={onConfirmOrderButton} style={[{ backgroundColor: buttonDelay? colors.lesspink : colors.mediumpink, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white}>สั่งสินค้า</SetText>
                </TouchableOpacity>
            </View>
        </>
    );
}