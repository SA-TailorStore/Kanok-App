import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

export default function MyAddress() {
    const router = useRouter();
    const [displayName, setDisplayName] = useState<string>('ไอแมน ไอหมูตอน');
    const [phoneNumber, setPhoneNumber] = useState<string>('081-000-0000');
    const [address1, setAddress1] = useState<string>('123/456 หมู่ 7 ซอย 8 ตำบล แขวง');
    const [address2, setAddress2] = useState<string>('Rayong Thailand 21000');

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "ที่อยู่ของฉัน",
        });
    }, [])
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

                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: colors.line, marginVertical: 25 }}/>

                <SetText size={20} type='bold' style={{ marginBottom: 10 }}>ที่อยู่</SetText>
                <View style={{ flex: 1, width: '100%', backgroundColor: colors.white, borderRadius: 16, ...styles.shadowCustom, padding: 20 }}>
                    <SetText size={14} color={colors.grey}>บ้านเลขที่, หมู่, ซอย, ตำบล, แขวง</SetText>
                    <TextInput multiline style={{ width: '100%', height: 150, borderColor: colors.line, borderBottomWidth: 1, fontFamily: 'notoSansThai', textAlignVertical: 'top' }} value={address1} onChange={(e) => setAddress1(e.nativeEvent.text)} />
                    <SetText size={14} color={colors.grey} style={{ marginTop: 8 }}>อำเภอ, เขต, จังหวัด, รหัสไปรษณีย์</SetText>
                    <TextInput style={{ width: '100%', height: 120, borderColor: colors.line, fontFamily: 'notoSansThai', textAlignVertical: 'top' }} value={address2} onChange={(e) => setAddress2(e.nativeEvent.text)} />
                </View>
            </ScrollView>
            <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: colors.line, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', zIndex: 90, flex: 1, flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={()=>console.log('ติดต่อร้าน')} style={[{ flex: 1, backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', width: '100%', height: 45 }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white} style={{ position: 'absolute', width: '100%', textAlign: 'center', left: 20}}>ยืนยัน</SetText>
                </TouchableOpacity>
            </View>
        </WrapBackground>
    )
}