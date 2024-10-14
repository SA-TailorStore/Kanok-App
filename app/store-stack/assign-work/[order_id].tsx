import Loading from "@/components/Loading";
import { ContactButton } from "@/components/order-button/ContactButton";
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
    const [selected, setSelected] = useState<string>('');
    const route = useRoute() as { params: { order_id: string } };
    const router = useRouter();
    const navigation = useNavigation();
    const { order_id } = route.params;
    const [order, setOrder] = useState<IOrder>();

    const { showToast } = useToast();

    useEffect(() => {
        console.log(order_id);
        navigation.setOptions({
            headerTitle: "",
        });
        fetchOrder();
    }, [])

    useEffect(() => {
        console.log(selected);
    }, [selected])

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
            <View style={{ flex: 1 }}>
                <View style={{ paddingTop: '15%', marginHorizontal: '8%', paddingBottom: 10 }}>
                    <SetText size={24} type="bold">มอบหมายงานให้ช่าง</SetText>
                    <SetText size={16}>เลือกช่างเพื่อมอบหมายงาน</SetText>

                </View>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 10, paddingVertical: 6, paddingBottom: 20 }}>
                    {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
                        <TailorCard tailor={index} setSelected={setSelected} />
                    ))}
                </ScrollView>
            </View>
        </WrapBackground>
    );
}

const TailorCard = ({ tailor, setSelected }: { tailor: number, setSelected: React.Dispatch<React.SetStateAction<string>> }) => {
    const onSelected = () => {
        setSelected(tailor.toString());
    }
    return (
        <TouchableOpacity onPress={() => onSelected()} style={{ flex: 1, flexDirection: 'row', width: '100%', height: 85, alignItems: 'center', gap: 10, paddingHorizontal: 10, borderRadius: 10, ...styles.shadowCustom, backgroundColor: colors.backgroundColor }}>
            <View style={{ borderWidth: 1, width: 60, height: 60, borderRadius: 999 }}>
                {/* รูป */}
            </View>
            <View style={{ flexDirection: 'column' }}>
                <SetText type='bold'>Andrea Jones</SetText>
                <SetText type='bold'>จำนวนงานปัจจุบัน : 15 / 20</SetText>
                <View style={{ width: 90 }}>
                    <ContactButton phone_number='123456' who="ช่าง" />
                </View>
            </View>
            <View style={{ borderWidth: 1, width: 15, height: 15, position: 'absolute', borderRadius: 999, right: 8, top: 8 }}>

            </View>
        </TouchableOpacity>
    )
}

