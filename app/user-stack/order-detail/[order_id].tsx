import ConfirmOrderCard, { ConfirmOrderCardSkeleton } from "@/components/ComfirmOrderCard";
import { ContactButton } from "@/components/order-button/ContactButton";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useToast } from "@/contexts/ToastContext";
import { IOrder } from "@/types/IOrder";
import { IProduct } from "@/types/IProduct";
import { ProductRequest } from "@/types/ProductRequest";
import { formatDate } from "@/utils/formatDate";
import { orderState, userOrderState } from "@/utils/orderState";
import { colors, styles } from "@/utils/styles";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, ScrollView, Linking, Alert } from "react-native";
import { Iconify } from "react-native-iconify";

export default function OrderDetail() {
    const router = useRouter();
    const [isShow2, setIsShow2] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const { showToast } = useToast();

    const route = useRoute() as { params: { order_id: string } };
    const navigation = useNavigation();
    const { order_id } = route.params;
    const [order, setOrder] = useState<IOrder>();
    const [products, setProducts] = useState<ProductRequest[]>([]);

    useEffect(() => {
        // console.log(order_id);
        navigation.setOptions({
            headerTitle: "รายละเอียดคำสั่งซื้อ",
        });
        fetchOrder();
        setInterval(() => {
            fetchOrder();
        }, 3000);
    }, [])

    const fetchOrder = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/get', { order_id: order_id }).then((res) => {
            if (res.status === 200) {
                setOrder(res.data.data);
                fetchProducts();
                // console.log(res.data.data)
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching orders');
        })
    }

    const fetchProducts = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/product/get/order', { order_id: order_id }).then((res) => {
            if (res.status === 200) {
                setProducts(res.data.data);
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching products');
        })
    }

    const onReceivedOrder = async () => Alert.alert('ยืนยันการรับสินค้า', 'ก่อนกดยืนยันการรับสินค้า กรุณาตรวจสอบสินค้าทุกชิ้นใบคำสีั่งซื้อว่าสินค้าที่ได้รับนั้นครบถ้วน หลังจากยืนยันแล้วจะไม่สามารถแก้ไขได้อีก', [
        {
            text: 'ยกเลิก',
            onPress: () => console.log('ยกเลิก'),
            style: 'cancel',
        },
        {
            text: 'ยืนยัน', onPress: async () => {
                await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/update/status', { order_id: order_id, status: orderState.success_user }).then((res) => {
                    if (res.status === 204) {
                        console.log('success');
                        showToast('ยืนยันการรับสินค้าสำเร็จ', 'คุณได้ยืนยันการรับสินค้าสำเร็จ', 'success');
                    } else {
                        console.log(res.status);
                    }
                }).catch((err) => {
                    console.log('error fetching orders');
                })
            }
        },
    ]);

    if (!order) return null;
    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '7%', backgroundColor: colors.wherewhite }} />
            <ScrollView style={{ flex: 1, height: '100%' }} contentContainerStyle={{ paddingBottom: 120 }}>
                <View style={{ marginHorizontal: '5%', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, ...styles.shadowCustom }}>
                    <View style={{ backgroundColor: colors.mediumpink, padding: 10 }}>
                        <SetText type="bold" size={16} color={colors.white}>หมายเลขคำสั่งซื้อ #{order_id}</SetText>
                    </View>
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.line }}>
                        <SetText color={colors.grey}>วันที่สั่งซื้อสินค้า</SetText>
                        <SetText color={colors.grey}>{formatDate(order?.timestamp!)}</SetText>
                    </View>
                    {(orderState.received_user === order.status) && <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderColor: colors.line }}>
                        <SetText color={colors.whereblack} type='bold'>ข้อมูลการจัดส่ง</SetText>
                        <SetText>{order.tracking_number.split('|')[0]} {order.tracking_number.split('|')[1]}</SetText>
                    </View>}
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, marginBottom: 10 }}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.whereblack} type='bold'>ที่อยู่ในการจัดส่ง</SetText>
                            <SetText size={14} color={colors.grey}><ContactButton phone_number={order.store_address} who="ร้าน" /></SetText>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '100%' }}>
                            <Iconify icon="bx:bx-map" size={20} color={colors.whereblack} />
                            <View style={{ flexDirection: 'column', flexWrap: 'wrap', flex: 1, padding: 5 }}>
                                <SetText
                                    color={colors.whereblack}
                                    size={12}
                                    type="bold"
                                    style={{ flexWrap: 'wrap', width: '100%' }}
                                >
                                    {order.user_address.split('|')[0]}, {order.user_phone}
                                </SetText>
                                <SetText
                                    color={colors.grey}
                                    type="small"
                                    style={{ flex: 1, flexWrap: 'wrap', width: '100%' }}
                                >
                                    ที่อยู่ {order.user_address.split('|')[1]}
                                </SetText>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '3%', marginHorizontal: '5%', backgroundColor: colors.white, borderRadius: 10, ...styles.shadowCustom }}>
                    {products[0] === undefined ? <ConfirmOrderCardSkeleton /> :isShow2 ?
                        <>
                            {products.map((item: IProduct | any, index: number) => <ConfirmOrderCard item={item} setSelectedProduct={setSelectedProduct} key={index} />)}
                        </> : <ConfirmOrderCard item={products[0]} setSelectedProduct={setSelectedProduct} />

                    }
                    <TouchableOpacity disabled={products.length <= 1} onPress={() => setIsShow2((s) => !s)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', borderTopWidth: 1, borderColor: colors.line, paddingVertical: '3%' }}>
                        <SetText type='bold' size={14}>รวมจำนวนสินค้าทั้งหมด</SetText>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <SetText type='bold' size={14}>{products.length} รายการ</SetText>
                            <Iconify icon="weui:back-filled" size={16} color={colors.whereblack} style={[{ transform: [{ rotate: isShow2 ? '90deg' : '-90deg' }] }]} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {![orderState.cancel, orderState.success_user].includes(order.status) && <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', zIndex: 90, flex: 1, flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${order.store_phone}`)} style={[{ flex: 1, backgroundColor: colors.lesspink, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <Iconify icon="f7:phone-circle-fill" size={30} color={colors.mediumpink} />
                    <SetText size={16} type="bold" color={colors.mediumpink} style={{ flex: 1, width: '100%', textAlign: 'center' }}>ติดต่อร้าน</SetText>
                </TouchableOpacity>
                {order?.status === 'payment' && <TouchableOpacity onPress={()=>router.push(`/user-stack/payment/${order_id}`)} style={[{ flex: 1, backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <Iconify icon="pepicons-pop:credit-card-circle-filled" size={30} color={colors.white} />
                    <SetText size={16} type="bold" color={colors.white} style={{ flex: 1, width: '100%', textAlign: 'center' }}>ชำระเงิน</SetText>
                </TouchableOpacity>}
                {userOrderState[3].status.includes(order!.status) && <TouchableOpacity onPress={onReceivedOrder} style={[{ flex: 1, backgroundColor: colors.mediumpink, paddingVertical: 25, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ position: 'absolute', width: '100%', textAlign: 'center', left: 15 }}>ฉันได้รับสินค้าแล้ว</SetText>
                </TouchableOpacity>}
            </View>}
        </WrapBackground>
    );
}