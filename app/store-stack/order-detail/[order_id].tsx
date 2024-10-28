import ConfirmOrderCard, { ConfirmOrderCardSkeleton } from "@/components/ComfirmOrderCard";
import { ContactButton } from "@/components/order-button/ContactButton";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useToast } from "@/contexts/ToastContext";
import { IOrder } from "@/types/IOrder";
import { IProduct } from "@/types/IProduct";
import { IUser } from "@/types/IUser";
import { ProductRequest } from "@/types/ProductRequest";
import { formatDate } from "@/utils/formatDate";
import { formatTrackingNumber } from "@/utils/formatTrackingNumber";
import { orderState, storeOrderState, userOrderState } from "@/utils/orderState";
import { colors, styles } from "@/utils/styles";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, ScrollView, TextInput, Alert, Keyboard, Linking } from "react-native";
import { Iconify } from "react-native-iconify";

export default function OrderDetail() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isShow2, setIsShow2] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [isPaymentPopup, setIsPaymentPopup] = useState<boolean>(false);
    const [buttonDelay, setButtonDelay] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [orderOwner, setOrderOwner] = useState<IUser>();
    const [orderTailor, setOrderTailor] = useState<IUser>();

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
                fetchOrderOwner(res.data.data);
            }
        }).catch((err) => {
            console.log('error fetching orders');
        })
    }

    const fetchProducts = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/product/get/order', { order_id: order_id }).then((res) => {
            if (res.status === 200) setProducts(res.data.data);
        }).catch((err) => {
            console.log('error fetching products');
        })
    }

    const fetchOrderOwner = async (order: IOrder) => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/user/id', { user_id: order?.created_by }).then((res) => {
            if (res.status === 200) {
                setOrderOwner(res.data.data);
            } else {
                console.log(res.status);
            }
        }
        ).catch((err) => {
            console.log('error fetching user');
        });

        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/user/id', { user_id: order?.tailor_id }).then((res) => {
            if (res.status === 200) setOrderTailor(res.data.data);
        }
        ).catch((err) => {
            console.log('error fetching tailor');
        })
    }

    const updatePriceAndStatus = async () => {
        setButtonDelay(true);
        if (price === 0) {
            setButtonDelay(false);
            showToast('เกิดข้อผิดพลาด', 'เนื่องจากราคาสินค้าต้องมากกว่า 0 บาท', 'error');
            return;
        }
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/update/price', { order_id: order_id, price: price }).then((res) => {
            if (res.status === 204) {
                console.log('success');
                fetchOrder();
                showToast('แจ้งราคาสินค้าสำเร็จ', 'คุณได้แจ้งราคาสินค้าสำเร็จ', 'success');
                setButtonDelay(false);
                setIsPaymentPopup(false);
                Keyboard.dismiss();
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching orders');
        })
    }

    const onCancleOrder = async () => Alert.alert('ยกเลิกคำสั่งซื้อ', 'คุณต้องการยกเลิกคำสั่งซื้อนี้ใช่หรือไม่', [
        {
            text: 'ยกเลิก',
            onPress: () => console.log('ยกเลิก'),
            style: 'cancel',
        },
        {
            text: 'ยืนยัน', onPress: async () => {
                await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/update/status', { order_id: order_id, status: orderState.cancel }).then((res) => {
                    if (res.status === 204) {
                        console.log('success');
                        showToast('ยกเลิกคำสั่งซื้อสำเร็จ', 'คุณได้ยกเลิกคำสั่งซื้อสำเร็จ', 'success');
                        router.back();
                    } else {
                        console.log(res.status);
                    }
                }).catch((err) => {
                    console.log('error fetching orders');
                })
            }
        },
    ]);

    const onConfirmButton = () => Alert.alert('ยืนยันราคาสินค้า', 'ตรวจสอบราคาสินค้าก่อนยืนยันเมื่อลูกค้าแจ้งหลักฐานโอนระบบจะตรวจสอบความถูกต้องของหลักฐาน', [
        {
            text: 'ยกเลิก',
            onPress: () => console.log('ยกเลิก'),
            style: 'cancel',
        },
        {
            text: 'ยืนยัน', onPress: () => {
                updatePriceAndStatus();
            }
        },
    ]);

    const onConfirmReceivedButton = () => Alert.alert('ยืนยันการรับสินค้า', 'ก่อนกดยืนยันการรับสินค้ากรุณา ตรวจสอบสินค้าทุกชิ้นว่าสินค้าที่ได้รับครบถ้วน', [
        {
            text: 'ยกเลิก',
            onPress: () => console.log('ยกเลิก'),
            style: 'cancel',
        },
        {
            text: 'ยืนยัน', onPress: async () => {
                await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/update/status', { order_id: order_id, status: orderState.success_shop }).then((res) => {
                    if (res.status === 204) {
                        console.log('success');
                        showToast('รับสินค้าสำเร็จ', 'คุณได้รับสินค้าสำเร็จแล้ว', 'success');
                        fetchOrder();
                        // router.back();
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

                {/* -------------------------------- ข้อมูลของลูกค้า -------------------------------- */}
                <View style={{ marginHorizontal: '5%', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, ...styles.shadowCustom }}>
                    <View style={{ backgroundColor: colors.mediumpink, padding: 10 }}>
                        <SetText type="bold" size={16} color={colors.white}>หมายเลขคำสั่งซื้อ #{order_id}</SetText>
                    </View>
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, flexDirection: 'column', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.line }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.black} type="bold">ข้อมูลลูกค้า</SetText>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.grey}>สั่งสินค้าโดย</SetText>
                            <SetText size={14} color={colors.grey}>{orderOwner?.display_name}</SetText>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.grey}>วันที่สั่งซื้อสินค้า</SetText>
                            <SetText size={14} color={colors.grey}>{formatDate(order.timestamp)}</SetText>
                        </View>
                    </View>
                    {(orderState.received_user === order.status) && <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderColor: colors.line }}>
                        <SetText color={colors.whereblack} type='bold'>ข้อมูลการจัดส่ง</SetText>
                        <SetText>{formatTrackingNumber(order.tracking_number)}</SetText>
                    </View>}
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, marginBottom: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.whereblack} type='bold'>ที่อยู่ในการจัดส่ง</SetText>
                            <SetText size={14} color={colors.grey}><ContactButton phone_number={order.user_phone} who="ลูกค้า" /></SetText>
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

                {/* -------------------------------- ข้อมูลของช่าง -------------------------------- */}
                {order.created_by !== order.tailor_id && <View style={{ marginTop: '3%', marginHorizontal: '5%', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, ...styles.shadowCustom }}>
                    <View style={{ backgroundColor: colors.mediumpink, padding: 10 }}>
                        <SetText type="bold" size={16} color={colors.white}>หมายเลขงานช่าง #{order_id}</SetText>
                    </View>
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, flexDirection: 'column', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.line }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.black} type="bold">ข้อมูลช่าง</SetText>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.grey}>ชื่อช่าง</SetText>
                            <SetText size={14} color={colors.grey}>{orderTailor?.display_name}</SetText>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.grey}>วันที่ต้องส่งมอบ</SetText>
                            <SetText size={14} color={colors.grey}>{formatDate(order.due_date)}</SetText>
                        </View>
                    </View>
                    {([orderState.received_tailor, orderState.received_shop].includes(order.status)) && <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderColor: colors.line }}>
                        <SetText color={colors.whereblack} type='bold'>ข้อมูลการจัดส่ง</SetText>
                        <SetText>{formatTrackingNumber(order.tracking_number)}</SetText>
                    </View>}
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, marginBottom: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText size={14} color={colors.whereblack} type='bold'>ที่อยู่ในการจัดส่ง</SetText>
                            <SetText size={14} color={colors.grey}><ContactButton phone_number={order.tailor_phone} who="ช่าง" /></SetText>
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
                    {products[0] === undefined ? <ConfirmOrderCardSkeleton /> : isShow2 ?
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

            {(!storeOrderState[3].status.slice(1).includes(order.status) && !storeOrderState[7].status.includes(order.status)) && <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', zIndex: 90, flex: 1, flexDirection: 'row', gap: 10 }}>
                {/* ยกเลิกคำสั่งซื้อ */}
                {[orderState.pending, orderState.payment].includes(order?.status) && <TouchableOpacity onPress={onCancleOrder} style={[{ flex: 1, height: 50, backgroundColor: colors.line, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ width: '100%', textAlign: 'center' }}>ยกเลิกคำสั่งซื้อ</SetText>
                </TouchableOpacity>}
                {/* แจ้งราคาสินค้า */}
                {order?.status === 'pending' && <TouchableOpacity onPress={() => setIsPaymentPopup(p => !p)} style={[{ flex: 1, backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <Iconify icon="pepicons-pop:credit-card-circle-filled" size={30} color={colors.white} style={{ flex: 1 }} />
                    <SetText size={16} type="bold" color={colors.white} style={{ flex: 1, width: '100%', textAlign: 'center' }}>แจ้งราคาสินค้า</SetText>
                </TouchableOpacity>}
                {/* ติดต่อลูกค้า */}
                {[orderState.payment, orderState.received_user, orderState.success_shop].includes(order?.status) && <TouchableOpacity onPress={() => Linking.openURL(`tel:${order.user_phone}`)} style={[{ flex: 1, backgroundColor: colors.lesspink, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <Iconify icon="f7:phone-circle-fill" size={30} color={colors.mediumpink} />
                    <SetText size={16} type="bold" color={colors.mediumpink} style={{ flex: 1, width: '100%', textAlign: 'center' }}>ติดต่อลูกค้า</SetText>
                </TouchableOpacity>}
                {/* มอบหมายงานให้ช่าง */}
                {[orderState.waiting_assign].includes(order?.status) && <TouchableOpacity onPress={() => router.push(`/store-stack/assign-work/${order_id}`)} style={[{ flex: 1, backgroundColor: colors.mediumpink, paddingVertical: 25, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ position: 'absolute', width: '100%', textAlign: 'center', left: 15 }}>มอบหมายงานให้ช่าง</SetText>
                </TouchableOpacity>}
                {/* จัดส่งพัสดุให้ช่าง & ลูกค้า */}
                {[orderState.processing_user, orderState.success_shop].includes(order?.status) && <TouchableOpacity onPress={() => router.push(`/store-stack/tracking_number/${order_id}`)} style={[{ flex: 1, backgroundColor: colors.mediumpink, paddingVertical: 25, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ position: 'absolute', width: '100%', textAlign: 'center', left: 15 }}>{orderState.success_shop === order?.status ? "แจ้งจัดส่งพัสดุ" : "จัดส่งพัสดุ"}</SetText>
                </TouchableOpacity>}
                {/* รับพัสดุจากช่าง */}
                {order?.status === orderState.received_shop && <TouchableOpacity onPress={onConfirmReceivedButton} style={[{ flex: 1, backgroundColor: colors.mediumpink, paddingVertical: 25, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ position: 'absolute', width: '100%', textAlign: 'center', left: 15 }}>ฉันได้รับสินค้าแล้ว</SetText>
                </TouchableOpacity>}
            </View>}

            <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, display: isPaymentPopup ? 'flex' : 'none', justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 'auto', paddingTop: 20, justifyContent: 'flex-end', paddingBottom: 30, paddingHorizontal: '5%', zIndex: 90 }}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <View style={{ marginBottom: 10 }}>
                            <SetText type="bold" size={24}>แจ้งราคาสินค้า</SetText>
                            <SetText size={14}>กรอกราคารายการสั่งตัดทั้งหมด</SetText>
                        </View>
                        <TouchableOpacity onPress={() => setIsPaymentPopup(false)}><SetText type="bold" size={16}>ยกเลิก</SetText></TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, gap: 10 }}>
                        <SetText type="bold" size={16}>จำนวน</SetText>
                        <TextInput keyboardType="number-pad"
                            value={price ? price.toString() : ''}
                            onChange={(e) => parseInt(e.nativeEvent.text) > 0 ? setPrice(parseInt(e.nativeEvent.text)) : setPrice(0)}
                            style={{ flex: 1, width: '100%', height: 50, borderColor: colors.line, borderWidth: 1, borderRadius: 5, textAlignVertical: 'top', padding: 5, paddingHorizontal: 10 }} placeholder="กรอกราคา" />
                        <SetText type="bold" size={16}>บาท</SetText>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <SetText type="bold" size={16}>จำนวน</SetText>
                        <SetText type="bold" size={16}>{products.length} รายการ</SetText>
                    </View>
                    <TouchableOpacity disabled={buttonDelay} onPress={onConfirmButton} style={[{ backgroundColor: buttonDelay ? colors.lesspink : colors.mediumpink, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' }, styles.shadowCustom]}>
                        <SetText size={16} type="bold" color={colors.white}>แจ้งราคาสินค้า</SetText>
                    </TouchableOpacity>
                </View>
            </View>
        </WrapBackground>
    );
}