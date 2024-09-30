import { SetText } from "@/components/SetText";
import WrapManageDesign from "@/components/WrapManageDesign";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { IProduct } from "@/types/IProduct";
import ManageOrderCard from "@/components/ManageOrderCard";

const exampleData: IProduct[] = [
    {
        product_id: '0',
        design_id: 0,
        detail: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil suscipit accusantium placeat voluptatum, non a sunt sed incidunt itaque? Omnis nisi, in facere nam voluptas aliquid ducimus quidem voluptatum amet.',
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '1',
        design_id: 0,
        detail: "รายละเอียด2",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '2',
        design_id: 0,
        detail: "รายละเอียด3",
        size: 'XXL',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '0',
        design_id: 0,
        detail: "รายละเอียด",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '1',
        design_id: 0,
        detail: "รายละเอียด2",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '2',
        design_id: 0,
        detail: "รายละเอียด3",
        size: 'XXL',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '0',
        design_id: 0,
        detail: "รายละเอียด",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '1',
        design_id: 0,
        detail: "รายละเอียด2",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '2',
        design_id: 0,
        detail: "รายละเอียด3",
        size: 'XXL',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    }
];


export default function ManageDesign() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "รายการสั่งตัด",
        });
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
                                exampleData.map((item, index) => (
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