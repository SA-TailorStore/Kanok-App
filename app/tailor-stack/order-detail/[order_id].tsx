import { ConfirmOrderCardSkeleton } from "@/components/ComfirmOrderCard";
import ConfirmOrderCardTailor from "@/components/ComfirmOrderCardTailor";
import { ContactButton } from "@/components/order-button/ContactButton";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useToast } from "@/contexts/ToastContext";
import { IOrder } from "@/types/IOrder";
import { IProduct } from "@/types/IProduct";
import { ProductRequest } from "@/types/ProductRequest";
import { formatDate } from "@/utils/formatDate";
import { formatTrackingNumber } from "@/utils/formatTrackingNumber";
import { orderState } from "@/utils/orderState";
import { colors, styles } from "@/utils/styles";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Iconify } from "react-native-iconify";

export default function OrderDetail() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isShow2, setIsShow2] = useState<boolean>(false);

    const route = useRoute() as { params: { order_id: string } };
    const navigation = useNavigation();
    const { order_id } = route.params;
    const [order, setOrder] = useState<IOrder>();
    const [products, setProducts] = useState<ProductRequest[]>([]);

    useEffect(() => {
        // console.log(order_id);
        navigation.setOptions({
            headerTitle: "รายละเอียดของงาน",
        });

        const unsubscribe = navigation.addListener('focus', () => {
            fetchOrder();
            fetchProducts();
            setInterval(() => {
                fetchOrder();
                fetchProducts();
            }, 3000);
        });
        return unsubscribe;
    }, []);

    const fetchOrder = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/get', { order_id: order_id }).then((res) => {
            if (res.status === 200) {
                setOrder(res.data.data);
                console.log(1)
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
                console.log(2)
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching products');
        })
    }

    const onReceivedOrder = async () => Alert.alert('ยืนยันการรับสินค้า', 'คุณต้องการยืนยันว่าได้รับสินค้าแล้วหรือไม่', [
        {
            text: 'ยกเลิก',
            onPress: () => console.log('ยกเลิก'),
            style: 'cancel',
        },
        {
            text: 'ยืนยัน', onPress: async () => {
                await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/update/status', { order_id: order_id, status: orderState.processing_tailor }).then((res) => {
                    if (res.status === 204) {
                        console.log('success');
                        showToast('ยืนยันการรับพัสดุ', 'คุณได้ยืนยันการรับพัสดุสำเร็จ', 'success');
                        fetchOrder();
                    } else {
                        console.log(res.status);
                    }
                }).catch((err) => {
                    console.log('error fetching orders');
                })
            }
        },
    ]);

    if (order === undefined) return null;
    if (order?.status === orderState.cancel) return null;
    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '7%', backgroundColor: colors.wherewhite }} />
            <ScrollView style={{ flex: 1, height: '100%' }} contentContainerStyle={{ paddingBottom: 120 }}>

                {/* -------------------------------- ข้อมูลของช่าง -------------------------------- */}
                {order.created_by !== order.tailor_id && <View style={{ marginTop: '3%', marginHorizontal: '5%', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, ...styles.shadowCustom }}>
                    <View style={{ backgroundColor: colors.mediumpink, padding: 10 }}>
                        <SetText type="bold" size={16} color={colors.white}>หมายเลขงานช่าง #{order_id}</SetText>
                    </View>
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, flexDirection: 'column', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.line }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.grey}>วันที่ต้องส่งมอบงาน</SetText>
                            <SetText size={14} color={colors.grey}>{formatDate(order.due_date)}</SetText>
                        </View>
                    </View>
                    {([orderState.received_tailor, orderState.received_shop].includes(order.status)) && <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderColor: colors.line }}>
                        <SetText color={colors.whereblack} type='bold'>ข้อมูลการจัดส่ง</SetText>
                        <SetText>{formatTrackingNumber(order.tracking_number)}</SetText>
                    </View>}
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, marginBottom: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.whereblack} type='bold'>ที่อยู่ในการจัดส่งของร้าน</SetText>
                            <SetText size={14} color={colors.grey}><ContactButton phone_number={order.store_phone} who="ร้าน" /></SetText>
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
                                    {order.store_address.split('|')[0]}, {order.store_phone}
                                </SetText>
                                <SetText
                                    color={colors.grey}
                                    type="small"
                                    style={{ flex: 1, flexWrap: 'wrap', width: '100%' }}
                                >
                                    ที่อยู่ {order.store_address.split('|')[1]}
                                </SetText>
                            </View>
                        </View>
                    </View>
                </View>}

                <View style={{ marginTop: '3%', marginHorizontal: '5%', backgroundColor: colors.white, borderRadius: 10, ...styles.shadowCustom }}>
                    <View style={{ flexDirection: 'column', marginTop: 10, paddingHorizontal: 15, borderBottomWidth: 1, paddingBottom: 15, borderColor: colors.line }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} type="bold" style={{}}>ความคืบหน้าทั้งหมด</SetText>
                            <SetText size={14} type="bold" style={{}}>สำเร็จแล้ว {products.reduce((acc, item) => acc + item.process_quantity, 0)}/{products.reduce((acc, item) => acc + item.total_quantity, 0)} ตัว</SetText>
                        </View>
                        <View style={{ height: 6, borderRadius: 999, backgroundColor: colors.line }}>
                            <View style={{ height: 6, borderRadius: 999, backgroundColor: colors.primary, width: `${products.reduce((acc, item) => acc + item.process_quantity, 0) / products.reduce((acc, item) => acc + item.total_quantity, 0) * 100}%` }}></View>
                        </View>
                    </View>
                    {products[0] === undefined ? <ConfirmOrderCardSkeleton /> : isShow2 ?
                        <>
                            {products.map((item: IProduct | any, index: number) => <ConfirmOrderCardTailor showDailyReport={order.status !== orderState.received_tailor} order_id={order_id} item={item} key={index} />)}
                        </> : <ConfirmOrderCardTailor showDailyReport={order.status !== orderState.received_tailor} order_id={order_id} item={products[0]} />
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

            {(orderState.processing_tailor !== order.status && ![orderState.received_shop, orderState.success_shop, orderState.received_user, orderState.success_user].includes(order.status)) && <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', zIndex: 90, flex: 1, flexDirection: 'row', gap: 10 }}>
                {/* ฉันได้รับสินค้าแล้ว */}
                {[orderState.received_tailor].includes(order?.status) && <TouchableOpacity onPress={onReceivedOrder} style={[{ flex: 1, height: 50, backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ width: '100%', textAlign: 'center' }}>ฉันได้รับสินค้าแล้ว</SetText>
                </TouchableOpacity>}
                {/* แจ้งจััดส่งพัสดุ */}
                {order?.status === orderState.success_tailor && <TouchableOpacity onPress={() => router.push(`/tailor-stack/tracking_number/${order_id}`)} style={[{ flex: 1, backgroundColor: colors.mediumpink, paddingVertical: 25, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ position: 'absolute', width: '100%', textAlign: 'center', left: 15 }}>แจ้งจัดส่งพัสดุ</SetText>
                </TouchableOpacity>}
            </View>}
        </WrapBackground>
    );
}