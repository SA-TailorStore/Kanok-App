import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Alert, Keyboard, FlatList, Image, ScrollView, TextInput } from "react-native";
import { useToast } from "@/contexts/ToastContext";
import axios from "axios";

import { useRoute } from "@react-navigation/native";
import { IDesign } from "@/types/IDesign";
import { IOrder } from "@/types/IOrder";
import { formatDate } from "@/utils/formatDate";
import { Iconify } from "react-native-iconify";
import { ProductRequest } from "@/types/ProductRequest";

export default function TrackingNumber() {
    const route = useRoute() as { params: { data: string } };
    const { data } = route.params;
    const order_id = data.split('|')[0];
    const product_id = data.split('|')[1];

    const navigation = useNavigation();
    const router = useRouter();
    const { showToast } = useToast();

    const [product, setProduct] = useState<ProductRequest>();
    const [loading, setLoading] = useState(false);
    const [design, setDesign] = useState<IDesign>();
    const [order, setOrder] = useState<IOrder>();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
        });
        fetchOrder();
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/product/get', { product_id: product_id }).then(async (res) => {
            if (res.status === 200) {
                setProduct(res.data.data);
                fetchDesign(res.data.data.design_id)
                setQuantity(res.data.data.process_quantity)
                console.log(res.data.data.design_id)
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching products');
        })
    }

    const fetchOrder = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/get', { order_id: order_id }).then(async (res) => {
            if (res.status === 200) {
                console.log('order order')
                setOrder(res.data.data);

            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching order');
        })
    }

    const fetchDesign = async (design_id: number) => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/design/get', {
            design_id: design_id
        }).then((res) => {
            if (res.status === 200) {
                setDesign(res.data.data);
                console.log(res.data.data)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const createTwoButtonAlert = () => {
        Alert.alert('ยืินยันการจัดส่งสินค้า', 'ก่อนกดยืนยันการจัดส่งสินค้า กรุณาตรวจสอบเลขพัสดุและช่องทางการจัดส่งถูกต้อง', [
            {
                text: 'ยกเลิก',
                onPress: () => console.log('ยกเลิก'),
                style: 'cancel',
            },
            {
                text: 'ยืนยันการจัดส่งสินค้า', onPress: async () => {
                    Keyboard.dismiss();
                    console.log(order_id);

                }
            },
        ]);
    }

    const increaseQuantity = () => {
        setQuantity((q) => q + 1);
    }

    const increaseQuantity10 = () => {
        setQuantity((q) => q + 10);
    }

    const decreaseQuantity = () => {
        setQuantity((q) => {
            if (q - 1 < 0) return 0;
            return q - 1;
        });
    }

    const decreaseQuantity10 = () => {
        setQuantity((q) => {
            if (q - 10 < 0) return 0;
            return q - 10;
        });
    }

    if (!order || !design || !product) return null
    return (
        <WrapBackground color={colors.backgroundColor}>
            <ScrollView style={{ flex: 1, paddingTop: '15%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: 200 }}>
                <Image source={{ uri: design?.design_url }} style={{ width: '90%', height: 400, borderRadius: 8 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '90%', marginTop: 20, borderBottomWidth: 1, borderColor: colors.line, paddingBottom: 10 }}>
                    <SetText type="bold">รหัสสินค้า : {design.design_id}</SetText>
                    <SetText type="bold">วันที่ต้องส่งมอบงาน : {formatDate(order!.due_date)}</SetText>
                    <SetText>ประเภท : {design.type}</SetText>
                    <SetText>ไซส์ : {product.size}</SetText>
                </View>

                <View style={{ flexDirection: 'column', marginTop: 10, width: '90%', gap: 2 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText size={14} type="bold" style={{}}>ความคืบหน้า</SetText>
                        <SetText size={14} type="bold" style={{}}>สำเร็จแล้ว {product.process_quantity}/{product.total_quantity} ตัว</SetText>
                    </View>
                    <View style={{ height: 6, borderRadius: 999, backgroundColor: colors.line }}>
                        <View style={{ height: 6, borderRadius: 999, backgroundColor: colors.primary, width: `${product.process_quantity / product.total_quantity * 100}%` }}></View>
                    </View>
                </View>

                <View style={{ marginTop: 10, flexDirection: 'row', gap: 15, alignItems: 'center', width: '90%' }}>
                    <TouchableOpacity disabled={quantity === 0} style={quantity === 0 ? { opacity: 0.3 } : undefined} onPress={decreaseQuantity} onLongPress={decreaseQuantity10}>
                        <Iconify icon="simple-line-icons:minus" size={24} color={colors.whereblack} />
                    </TouchableOpacity>
                    <TextInput
                        keyboardType="number-pad"
                        value={quantity.toString()}
                        onChange={(e) => parseInt(e.nativeEvent.text) > 0 ? setQuantity(parseInt(e.nativeEvent.text)) : setQuantity(0)}
                        style={{ flex: 1, borderBottomWidth: 0.5, borderColor: colors.line, borderRadius: 10, height: 40, width: '100%', textAlign: 'center', fontFamily: 'notoSansThai', padding: 8 }}
                    />
                    <TouchableOpacity onPress={increaseQuantity} onLongPress={increaseQuantity10}>
                        <Iconify icon="simple-line-icons:plus" size={24} color={colors.whereblack} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', zIndex: 90, flex: 1, flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity disabled={loading} onPress={createTwoButtonAlert} style={[{ flex: 1, height: 50, backgroundColor: loading ? colors.grey : colors.mediumpink, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ width: '100%', textAlign: 'center' }}>บันทึกรายงานประจำวัน</SetText>
                </TouchableOpacity>
            </View>
        </WrapBackground>
    );
}