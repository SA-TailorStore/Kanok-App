import Loading from "@/components/Loading";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useToast } from "@/contexts/ToastContext";
import { colors, styles } from "@/utils/styles";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity, View, Platform, ScrollView, Alert } from "react-native";
import { Iconify } from "react-native-iconify";
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

const createFormData = (photo: any, body: any = {}) => {
    const data = new FormData() as any;

    data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

const handleUploadConfirm = () =>
    Alert.alert('ยืนยันการชำระเงิน', 'กรุณาตรวจสอบการอัพโหลดหลักฐาน ก่อนการยืนยันการชำระเงิน', [
        {
            text: 'ยกเลิก',
            onPress: () => console.log('ยกเลิก'),
            style: 'cancel',
        },
        {
            text: 'ยืนยันการชำระเงิน', onPress: () => console.log('ยืนยันการชำระเงิน')
        },
    ]);

export default function Payment() {
    const [photo, setPhoto] = useState<any>(null);

    const route = useRoute() as { params: { order_id: string } };
    const router = useRouter();
    const navigation = useNavigation();
    const { order_id } = route.params;

    const { showToast } = useToast();

    useEffect(() => {
        console.log(order_id);
        navigation.setOptions({
            headerTitle: "",
        });
    }, [])

    const { width } = Dimensions.get('window');

    const handleChoosePhoto = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (!response.didCancel) {
                setPhoto(response);
            }
        });
    }



    // const handleUploadPhoto = () => {
    //     fetch(`${SERVER_URL}/api/upload`, {
    //         method: 'POST',
    //         body: createFormData(photo, { userId: '123' }),
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             console.log('response', response);
    //         })
    //         .catch((error) => {
    //             console.log('error', error);
    //         });
    // };


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
                        <SetText size={16} type='bold'>#1234567890</SetText>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText size={16}>จำนวน</SetText>
                        <SetText size={16}>3 รายการ</SetText>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText size={16}>ราคาทั้งสิ้น</SetText>
                        <SetText size={16}>145 บาท</SetText>
                    </View>
                </View>
                <View style={{ marginHorizontal: '8%', marginTop: 20 }}>
                    <SetText size={16} type="bold">อัพโหลดหลักฐานการชำระเงิน</SetText>
                    <TouchableOpacity onPress={handleChoosePhoto}  style={{ width: 116, height: 168, marginTop: 10, borderRadius: 10, backgroundColor: colors.white, ...styles.shadowCustom, alignItems: 'center', justifyContent: 'center' }}>
                        {photo && <TouchableOpacity onPress={() => setPhoto(null)} style={{ position: 'absolute', top: -10, right: -10, zIndex: 99 }}><Iconify icon="mdi:cross-circle" size={24} color={colors.black}/></TouchableOpacity>}
                        {photo? <Image source={{ uri: photo.assets[0].uri }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                        :<Iconify icon="fluent-emoji-high-contrast:plus" size={40} color={colors.line} />
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', paddingHorizontal: '5%', zIndex: 90 }}>
                <TouchableOpacity disabled={photo? false: true} onPress={handleUploadConfirm} style={[{ backgroundColor: photo? colors.mediumpink: colors.grey, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white}>ชำระเงิน</SetText>
                </TouchableOpacity>
            </View>
        </WrapBackground>
    );
}

