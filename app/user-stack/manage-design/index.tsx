import { SetText } from "@/components/SetText";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import WrapManageDesign from "@/components/WrapManageDesign";
import { colors, styles } from "@/utils/styles";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { IProduct } from "@/types/IProduct";
import { Iconify } from "react-native-iconify";
import ManageOrderCard from "@/components/ManageOrderCard";
import { IFabric } from "@/types/IFabric";

const exampleData: IProduct[] = [
    {
        product_id: 0,
        design_id: 0,
        detail: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil suscipit accusantium placeat voluptatum, non a sunt sed incidunt itaque? Omnis nisi, in facere nam voluptas aliquid ducimus quidem voluptatum amet.',
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: 1,
        design_id: 0,
        detail: "รายละเอียด2",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: 2,
        design_id: 0,
        detail: "รายละเอียด3",
        size: 'XXL',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: 0,
        design_id: 0,
        detail: "รายละเอียด",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: 1,
        design_id: 0,
        detail: "รายละเอียด2",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: 2,
        design_id: 0,
        detail: "รายละเอียด3",
        size: 'XXL',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: 0,
        design_id: 0,
        detail: "รายละเอียด",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: 1,
        design_id: 0,
        detail: "รายละเอียด2",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: 2,
        design_id: 0,
        detail: "รายละเอียด3",
        size: 'XXL',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    }
];

const fabricList: IFabric[] = [
    {
        fabric_id: 0,
        image: require('@/assets/images/fabric/0.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 1,
        image: require('@/assets/images/fabric/1.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 2,
        image: require('@/assets/images/fabric/2.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 3,
        image: require('@/assets/images/fabric/0.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 4,
        image: require('@/assets/images/fabric/1.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 5,
        image: require('@/assets/images/fabric/2.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 6,
        image: require('@/assets/images/fabric/0.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 7,
        image: require('@/assets/images/fabric/1.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 8,
        image: require('@/assets/images/fabric/2.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 9,
        image: require('@/assets/images/fabric/0.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 10,
        image: require('@/assets/images/fabric/1.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 11,
        image: require('@/assets/images/fabric/2.jpg'),
        quantity: 100,
    },

]

const sizeList = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ManageDesign() {
    const navigation = useNavigation();


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
                    <SetText type="bold" color={colors.mediumpink} size={16}>เพิ่มแบบ</SetText>
                </View>
                <View style={{ height: '100%' }}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 350 }} showsVerticalScrollIndicator={false}>
                            {
                                exampleData.map((item, index) => (
                                    <ManageOrderCard item={item} key={index} />
                                ))
                            }
                        </ScrollView>
                    </GestureHandlerRootView>
                </View>
            </WrapManageDesign>
            <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', paddingHorizontal: '5%', zIndex: 90 }}>
                <TouchableOpacity onPress={() => console.log('test')} style={[{ backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white}>สั่งตัดเสื้อผ้า</SetText>
                </TouchableOpacity>
            </View>
        </>
    );
}