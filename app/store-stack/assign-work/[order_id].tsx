import Loading from "@/components/Loading";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useToast } from "@/contexts/ToastContext";
import { IOrder } from "@/types/IOrder";
import { IProduct } from "@/types/IProduct";
import { orderState } from "@/utils/orderState";
import { colors, styles } from "@/utils/styles";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity, View, Platform, ScrollView, Alert } from "react-native";
import { Iconify } from "react-native-iconify";
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

export default function AssignWork() {
    const [photo, setPhoto] = useState<any>(null);

    const route = useRoute() as { params: { order_id: string } };
    const router = useRouter();
    const navigation = useNavigation();
    const { order_id } = route.params;
    const [order, setOrder] = useState<IOrder>();
    const [products, setProducts] = useState<IProduct[]>([]);

    const { showToast } = useToast();

    useEffect(() => {
        console.log(order_id);
        navigation.setOptions({
            headerTitle: "",
        });
        fetchOrder();
    }, [])

    const fetchOrder = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/get', { order_id: order_id }).then((res) => {
            if (res.status === 200) {
                setOrder(res.data.data);
                console.log(res.data.data)
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching orders');
        })
    }

    const handleConfirmButton = () =>
        Alert.alert('ยืนยันการชำระเงิน', 'กรุณาตรวจสอบการอัพโหลดหลักฐาน ก่อนการยืนยันการชำระเงิน', [
            {
                text: 'ยกเลิก',
                onPress: () => console.log('ยกเลิก'),
                style: 'cancel',
            },
            {
                text: 'ยืนยันการชำระเงิน', onPress: () => updateOrderTailor()
            },
        ]);

    const updateOrderTailor = () => {
        axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/update/status', {
            order_id: order_id,
            status: orderState.waiting_assign,
        }).then((res) => {
            if (res.status === 204) {
                console.log('เปลี่ยน state จ้า');
                showToast('ชำระเงินสำเร็จ', 'การชำระเงินสำเร็จ รอตรวจสอบการชำระเงิน', 'success');
                router.replace(`/user-stack/order-detail/${order_id}`);
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error updating order status');
        });
    }

    return (
        <WrapBackground color={colors.backgroundColor}>
            <Loading visible={false} text='กำลังตรวจสอบข้อมูล...' />
            <ScrollView style={{ flex: 1, marginBottom: 100 }}>
                <View style={{ borderBottomWidth: 1, paddingTop: '15%', marginHorizontal: '8%', borderColor: colors.line, paddingBottom: 10 }}>
                    <SetText size={24} type="bold">ชำระเงิน</SetText>
                    <SetText size={16}>ชำระเงินผ่าน QR PromptPay และส่งหลักฐานการโอน จากนั้นร้านจะตรวจสอบและดำเนินการผลิตสินค้า</SetText>
                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 12 }}>
                        <Image source={require('@/assets/images/qr.png')} />
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText size={16} type='bold'>หมายเลขคำสั่งซื้อ</SetText>
                        <SetText size={16} type='bold'>#{order?.order_id}</SetText>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText size={16}>จำนวน</SetText>
                        <SetText size={16}>{products.length} รายการ</SetText>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText size={16}>ราคาทั้งสิ้น</SetText>
                        <SetText size={16}>{order?.price} บาท</SetText>
                    </View>
                </View>
            </ScrollView>
        </WrapBackground>
    );
}

