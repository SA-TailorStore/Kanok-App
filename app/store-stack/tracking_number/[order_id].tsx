import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Alert, TextInput, Keyboard } from "react-native";9
import { useToast } from "@/contexts/ToastContext";
import Loading from "@/components/Loading";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { orderState } from "@/utils/orderState";
import { useRoute } from "@react-navigation/native";

export default function TrackingNumber() {
    const navigation = useNavigation();
    const router = useRouter();
    const [trackingNumber, setTrackingNumber] = useState<string>('');
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const route = useRoute() as { params: { order_id: string } };
    const { order_id } = route.params;


    const { showToast } = useToast();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
        });
    }, []);


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
                    setLoading(true);
                    console.log(order_id);
                    await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order/update/status', { order_id: order_id, status: orderState.received_tailor }).then((res) => {
                        if (res.status === 204) {
                            console.log('success');
                            showToast('จัดส่งพัสดุสำเร็จ', 'พัสดุของคุณกำลังถูกส่งไปหาช่าง', 'success');
                            router.back();
                        } else {
                            console.log(res.status);
                            setLoading(false);
                        }
                    }).catch((err) => {
                        console.log(err);
                        setLoading(false);
                    })
                }
            },
        ]);
    }

    const tag = [
        'Best Express',
        'DHL Domestic',
        'Flash Express',
        'ไปรษณีย์ไทย',
        'Kerry Express',
        'อื่นๆ',
    ]
    return (
        <WrapBackground color={colors.backgroundColor}>
            <Loading visible={loading} />
            <View style={{ flex: 1, flexDirection: 'column', gap: 15 }}>
                <View style={{ paddingTop: '15%', paddingHorizontal: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <SetText size={24} type="bold">กรอกข้อมูลพัสดุ</SetText>
                    <SetText size={16}>กรุณากรอกข้อมูลพัสดุเพื่อดำเนินการต่อ</SetText>
                </View>
                <View style={{ height: 50, marginHorizontal: 20, borderWidth: 1, borderRadius: 5, borderColor: colors.line, paddingHorizontal: 10, paddingVertical: 2 }}>
                    <SetText color={colors.grey}>เลขพัสดุ</SetText>
                    <TextInput
                        value={trackingNumber ? trackingNumber.toString() : ''}
                        onChange={(e) => setTrackingNumber(e.nativeEvent.text)}
                        style={{ flex: 1, width: '100%', textAlignVertical: 'top', }} placeholder="กรอกเลขพัสดุ" />
                </View>
                <View style={{ height: 50, width: '50%', marginHorizontal: 20, borderWidth: 1, borderRadius: 5, borderColor: colors.line, paddingHorizontal: 10, paddingVertical: 2 }}>
                    <SetText color={colors.grey}>ช่องทางการจัดส่ง</SetText>
                    <Dropdown
                        style={[{
                            flex: 1
                        }, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={{ fontSize: 16, fontFamily: 'notoSansThai', color: colors.grey }}
                        selectedTextStyle={{ fontSize: 16, fontFamily: 'notoSansThai' }}
                        itemTextStyle={{ fontSize: 16, fontFamily: 'notoSansThai' }}
                        data={tag.slice(1).map((item) => { return { label: item, value: item } })}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'เลือกช่องทางการจัดส่ง' : 'กำลังเลือก...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>
                {value === 'อื่นๆ' &&
                    <View style={{ height: 50, marginHorizontal: 20, borderWidth: 1, borderRadius: 5, borderColor: colors.line, paddingHorizontal: 10, paddingVertical: 2 }}>
                        <SetText color={colors.grey}>ช่องทางการจัดส่งอื่นๆ</SetText>
                        <TextInput
                            value={trackingNumber ? trackingNumber.toString() : ''}
                            onChange={(e) => setTrackingNumber(e.nativeEvent.text)}
                            style={{ flex: 1, width: '100%', textAlignVertical: 'top', }} placeholder="กรอกช่องทางอื่นๆ" />
                    </View>
                }
            </View>
            <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', zIndex: 90, flex: 1, flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity disabled={loading} onPress={createTwoButtonAlert} style={[{ flex: 1, height: 50, backgroundColor: loading ? colors.grey : colors.mediumpink, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ width: '100%', textAlign: 'center' }}>ยืนยันการจัดส่งสินค้า</SetText>
                </TouchableOpacity>
            </View>
        </WrapBackground>
    );
}
