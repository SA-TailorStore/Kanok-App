import { SetText } from "@/components/SetText";
import WrapManageDesign from "@/components/WrapManageDesign";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import ManageOrderCard from "@/components/ManageOrderCard";
import { useSession } from "@/contexts/SessionContext";
import { ProductRequest } from "@/types/ProductRequest";

export default function ManageDesign() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const { productContext, updateProductContext } = useSession();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "รายการสั่งตัด",
        });
        if (productContext.length === 0) {
            router.replace('/user-stack/choose-design-user');
        }
    }, []);

    return (
        <>
            <WrapManageDesign page='add design'>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                    <SetText type="bold" size={24}>แบบของฉัน</SetText>
                    <TouchableOpacity onPress={()=>router.replace('/user-stack/choose-design-user')}><SetText type="bold" color={colors.mediumpink} size={16}>เพิ่มแบบ</SetText></TouchableOpacity>
                </View>
                <View style={{ height: '100%' }}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 330 }} showsVerticalScrollIndicator={false}>
                            {
                                productContext.map((item: ProductRequest, index: number) => (
                                    <ManageOrderCard item={item} setSelectedProduct={setSelectedProduct} key={index} />
                                ))
                            }
                        </ScrollView>
                    </GestureHandlerRootView>
                </View>
            </WrapManageDesign>
            <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', paddingHorizontal: '5%', zIndex: 90 }}>
                <TouchableOpacity onPress={() => router.push('/user-stack/confirm-order')} style={[{ backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white}>สั่งตัดเสื้อผ้า</SetText>
                </TouchableOpacity>
            </View>
        </>
    );
}