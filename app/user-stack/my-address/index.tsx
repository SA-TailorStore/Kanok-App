import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useSession } from "@/contexts/SessionContext";
import { useToast } from "@/contexts/ToastContext";
import { UserResponse } from "@/types/IUser";
import { colors, styles } from "@/utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

export default function MyAddress() {
    const router = useRouter();
    const { userContext, tokenContext, refreshSession } = useSession();
    const { showToast } = useToast();
    const [displayName, setDisplayName] = useState<string>(userContext.display_name);
    const [phoneNumber, setPhoneNumber] = useState<string>(userContext.phone_number);
    const address = userContext.address.split('|');
    const [address1, setAddress1] = useState<string>(userContext.address.split("|")[0]);
    const [address2, setAddress2] = useState<string>(userContext.address.split("|")[1]);

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "ที่อยู่ของฉัน",
        });
    }, [])

    const onConfirmChangeButton = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/user/update/address', {
            token: tokenContext,
            display_name: displayName,
            phone_number: phoneNumber,
            address: address1 + '|' + address2,
        }).then(async (res) => {
            if (res.status === 204) {
                showToast('บันทึกข้อมูลสำเร็จ', 'ข้อมูลของคุณได้รับการบันทึกเรียบร้อยแล้ว', 'success');
                refreshSession();
            }
        }).catch((err) => {
            showToast('เกิดข้อผิดพลาด', 'error', 'error');
        })
    }


    if (!userContext) return null;
    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '7%', backgroundColor: colors.wherewhite }} />
            <ScrollView style={{ flex: 1, flexDirection: 'column', paddingHorizontal: '8%' }} contentContainerStyle={{ paddingBottom: 50 }}>
                <SetText size={20} type='bold' style={{ marginBottom: 10 }}>ช่องทางการติดต่อ</SetText>
                <View style={{ flex: 1, width: '100%', backgroundColor: colors.white, borderRadius: 16, ...styles.shadowCustom, padding: 20 }}>
                    <SetText size={14} color={colors.grey}>ชื่อ-นามสกุล</SetText>
                    <TextInput style={{ width: '100%', height: 30, borderColor: colors.line, borderBottomWidth: 1, fontFamily: 'notoSansThai', }} value={displayName} onChange={(e) => setDisplayName(e.nativeEvent.text)} />
                    <SetText size={14} color={colors.grey} style={{ marginTop: 8 }}>เบอร์โทรศัพท์</SetText>
                    <TextInput style={{ width: '100%', height: 30, borderColor: colors.line, fontFamily: 'notoSansThai', }} value={phoneNumber} onChange={(e) => setPhoneNumber(e.nativeEvent.text)} />
                </View>

                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: colors.line, marginVertical: 25 }} />

                <SetText size={20} type='bold' style={{ marginBottom: 10 }}>ที่อยู่</SetText>
                <View style={{ flex: 1, width: '100%', backgroundColor: colors.white, borderRadius: 16, ...styles.shadowCustom, padding: 20 }}>
                    <SetText size={14} color={colors.grey}>บ้านเลขที่, หมู่, ซอย, ตำบล, แขวง</SetText>
                    <TextInput multiline style={{ width: '100%', height: 150, borderColor: colors.line, borderBottomWidth: 1, fontFamily: 'notoSansThai', textAlignVertical: 'top' }} value={address1} onChange={(e) => setAddress1(e.nativeEvent.text)} />
                    <SetText size={14} color={colors.grey} style={{ marginTop: 8 }}>อำเภอ, เขต, จังหวัด, รหัสไปรษณีย์</SetText>
                    <TextInput style={{ width: '100%', height: 120, borderColor: colors.line, fontFamily: 'notoSansThai', textAlignVertical: 'top' }} value={address2} onChange={(e) => setAddress2(e.nativeEvent.text)} />
                </View>
            </ScrollView>
            <View style={{ backgroundColor: colors.white, borderTopWidth: 0.5, borderRadius: 20, borderTopColor: colors.line, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', zIndex: 90, flex: 1, flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={() => onConfirmChangeButton()} style={[{ flex: 1, backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%', height: 45 }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ position: 'absolute', width: '100%', textAlign: 'center', left: 20 }}>ยืนยัน</SetText>
                </TouchableOpacity>
            </View>
        </WrapBackground>
    )
}