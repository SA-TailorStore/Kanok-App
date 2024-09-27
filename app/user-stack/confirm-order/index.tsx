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


export default function ConfirmOrder() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "รายการสั่งตัด",
        });

        const fetchUser = async () => {
            const getStoredData = await AsyncStorage.getItem('@access_user');
            setUser(JSON.parse(getStoredData!).data);
            // console.log(getStoredData);
        }

        fetchUser();
    }, []);

    const onConfirmOrderButton = () => {
        router.dismissAll();
        router.replace('/user-stack/order-success');
    }

    if (!user) return null;
    return (
        <>
            <WrapManageDesign page='order'>
                <View style={{ flexDirection: 'column', marginBottom: 15, gap: 10 }}>
                    <SetText type="bold" size={24}>ที่อยู่ในการจัดส่ง</SetText>
                    <SettingMenuItem item={
                        {
                            icon: <Iconify icon="bx:bx-map" size={30} color={colors.whereblack} />,
                            title: user.address.length > 35 ? user.address.substring(0, 35) + '...' : user.address,
                            detail: user.display_name + ' ' + user.phone_number,
                            to: () => router.push('/')
                        }
                    } />
                </View>
                <View style={{ height: '100%' }}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 450 }} showsVerticalScrollIndicator={false}>
                            {
                                exampleData.map((item, index) => (
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
                    <SetText type="bold" size={16}>{exampleData.length} รายการ</SetText>
                </View>
                <TouchableOpacity onPress={onConfirmOrderButton} style={[{ backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white}>สั่งสินค้า</SetText>
                </TouchableOpacity>
            </View>
        </>
    );
}