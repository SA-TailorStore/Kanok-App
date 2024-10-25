import Loading from "@/components/Loading";
import { ContactButton } from "@/components/order-button/ContactButton";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useToast } from "@/contexts/ToastContext";
import { IOrder } from "@/types/IOrder";
import { IUser } from "@/types/IUser";
import { orderState } from "@/utils/orderState";
import { colors, styles } from "@/utils/styles";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Iconify } from "react-native-iconify";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function AssignWork() {
    const [selected, setSelected] = useState<string>('');
    const route = useRoute() as { params: { order_id: string } };
    const router = useRouter();
    const navigation = useNavigation();
    const { order_id } = route.params;
    const [order, setOrder] = useState<IOrder>();
    const [tailors, setTailor] = useState<any>();
    const [showAssignDate, setShowAssignDate] = useState<boolean>(false);

    const { showToast } = useToast();

    useEffect(() => {
        console.log(order_id);
        navigation.setOptions({
            headerTitle: "",
        });
        fetchOrder();
        getTailor();
    }, [])

    useEffect(() => {
        console.log(selected);
    }, [selected])

    const getTailor = async () => {
        await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/tailors').then((res) => {
            if (res.status === 200) {
                setTailor(res.data.data);
                console.log(res.data.data)
            } else {
                console.log(res.status);
            }
        }).catch((err) => {
            console.log('error fetching tailors');
        })
    }

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
                    {tailors?.map((tailor: any, index: number) => (
                        <TailorCard key={index} index={index} tailor={tailor} selected={selected === index.toString()} setSelected={setSelected} />
                    ))}
                </ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <TouchableOpacity onPress={() => selected !== '' ? setShowAssignDate(true) : null} style={{ alignItems: 'center', justifyContent: 'center', width: '100%', paddingVertical: 15, borderRadius: 999, backgroundColor: colors.mediumpink, ...styles.shadowCustom }}>
                        <SetText type='bold' size={16} style={{ textAlign: 'center' }} color={colors.white}>ยืนยันการเลือก</SetText>
                    </TouchableOpacity>
                </View>
            </View>
            {showAssignDate && <AssignDate order_id={order_id} tailor={tailors[selected]} setShowAssignDate={setShowAssignDate} />}
        </WrapBackground>
    );
}

const AssignDate = ({ setShowAssignDate, order_id, tailor }: { setShowAssignDate: React.Dispatch<React.SetStateAction<boolean>>, order_id: string, tailor: IUser }) => {
    const { showToast } = useToast();
    const router = useRouter();
    const [date, setDate] = useState(new Date());

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode: any) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const formatDate = (date: Date) => {
        const monthTH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day < 10 ? 0 : ''}${day} ${monthTH[month]} ${year}`;
    }

    const formatTime = (date: Date) => {
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${hour < 10 ? 0 : ''}${hour}:${minute < 10 ? 0 : ''}${minute}`;
    }

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleConfirmButton = async () => {
        console.log(order_id, tailor.user_id, date.toISOString());

        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/update/tailor', { order_id: order_id, tailor_id: tailor.user_id, due_date: date.toISOString() }).then(async (res) => {
            await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/update/status', {
                "order_id": order_id,
                "status": "processing_user",
            }).then((res) => {
                if (res.status === 204) {
                    showToast("มอบหมายงานสำเร็จ", "คุณได้มอบหมายงานให้ช่างสำเร็จ", "success")
                } else {
                    showToast("มอบหมายงานไม่สำเร็จ", "มอบหมายงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error")
                }
                router.back();
            }).catch((err) => {
                console.log(err);
                showToast("เกิดข้อผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้ (2)", "error")
            })
        }).catch((err) => {
            console.log(err);
            showToast("เกิดข้อผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้ (1)", "error")
        })


    }

    return (
        <View style={{ position: 'absolute', zIndex: 999, width: '100%', height: '100%' }}>
            <View style={{ backgroundColor: colors.black, width: '100%', height: '100%', opacity: 0.5 }} />
            <View style={{ backgroundColor: colors.wherewhite, position: 'absolute', width: '100%', bottom: 0 }}>
                <View style={{ padding: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <SetText type='bold' size={24}>เลือกวัน-เวลาที่ส่งมอบงาน</SetText>
                        <TouchableOpacity onPress={() => setShowAssignDate(false)} style={{ borderRadius: 5, backgroundColor: colors.grey, paddingHorizontal: 10, paddingVertical: 2 }}>
                            <SetText color={colors.white}>ยกเลิก</SetText>
                        </TouchableOpacity>
                    </View>
                    <SetText size={16}>เลือกวันและเวลาในการส่งมอบงานของช่าง</SetText>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <SetText type='bold'>เวลาที่ส่งมอบงาน</SetText>
                        <TouchableOpacity onPress={showDatepicker} style={{ borderWidth: 1, borderColor: colors.line, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3 }}>
                            <SetText>
                                {formatDate(date)}
                            </SetText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showTimepicker} style={{ borderWidth: 1, borderColor: colors.line, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3 }}>
                            <SetText>
                                {formatTime(date)}
                            </SetText>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleConfirmButton} style={{ marginTop: 13, alignItems: 'center', justifyContent: 'center', width: '100%', paddingVertical: 15, borderRadius: 999, backgroundColor: colors.mediumpink, ...styles.shadowCustom }}>
                        <SetText type='bold' size={16} style={{ textAlign: 'center' }} color={colors.white}>ยืนยัน</SetText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const TailorCard = ({ tailor, index, selected, setSelected }: { tailor: IUser, index: number, selected: boolean, setSelected: React.Dispatch<React.SetStateAction<string>> }) => {
    const onSelected = () => {
        setSelected(index.toString());
    }
    return (
        <TouchableOpacity onPress={() => onSelected()} style={{ flex: 1, flexDirection: 'row', width: '100%', height: 85, alignItems: 'center', gap: 10, paddingHorizontal: 10, borderRadius: 10, ...styles.shadowCustom, backgroundColor: colors.backgroundColor }}>
            <View style={{ borderWidth: 1, width: 60, height: 60, borderRadius: 999 }}>
                {/* รูป */}
            </View>
            <View style={{ flexDirection: 'column' }}>
                <SetText type='bold'>{tailor.display_name}</SetText>
                <SetText type='bold'>จำนวนงานปัจจุบัน : 15 / 20</SetText>
                <View style={{ width: 90 }}>
                    <ContactButton phone_number='123456' who="ช่าง" />
                </View>
            </View>
            <View style={{ borderWidth: 1, borderColor: selected ? colors.mediumpink : colors.line, width: 15, height: 15, position: 'absolute', alignItems: 'center', justifyContent: 'center', borderRadius: 999, right: 8, top: 8 }}>
                {selected && <Iconify icon="lets-icons:check-fill" size={20} color={colors.mediumpink} />}
            </View>
        </TouchableOpacity>
    )
}

