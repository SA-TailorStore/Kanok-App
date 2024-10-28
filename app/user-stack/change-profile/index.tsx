import { FormInput } from "@/components/FormInput";
import WrapBackground from "@/components/WrapBackground";
import { colors } from "@/utils/styles";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Iconify } from "react-native-iconify";
import AddPhoto from "@/assets/icons/add_photo";
import { useSession } from "@/contexts/SessionContext";
import { RightButton } from "@/components/RightButton";
import axios from "axios";
import { useToast } from "@/contexts/ToastContext";
import * as ImagePicker from 'expo-image-picker';
import Loading from "@/components/Loading";

export default function ChangeProfile() {
    const { userContext, tokenContext, refreshSession } = useSession();
    const { width } = useWindowDimensions();
    const [displayName, setDisplayName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'โปรไฟล์ของฉัน',
            headerRight: () => <RightButton title='บันทึก' action={saveProfile} disabled={displayName === '' && phoneNumber === ''} />
        });
        console.log(userContext);
    }, [displayName, phoneNumber]);

    const saveProfile = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/user/update/address', { token: tokenContext, display_name: displayName.length ? displayName : userContext.display_name, phone_number: phoneNumber.length ? phoneNumber : userContext.phone_number }).then(async (res) => {
            showToast('บันทึกข้อมูลโปรไฟล์สำเร็จ', 'คุณได้บันทึกข้อมูลโปรไฟล์สำเร็จ', 'success');
            setDisplayName('');
            setPhoneNumber('');
            refreshSession();
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            allowsEditing: true,
            quality: 0.5
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
            setIsLoading(true);
            let formData = new FormData() as any;
            formData.append('jwt', tokenContext);
            formData.append('image', {
                uri: result.assets[0].uri,
                type: 'image/jpeg',
                name: 'profile.jpg'
            });

            await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/user/profile/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(async (res) => {
                showToast('บันทึกข้อมูลสำเร็จ', 'ข้อมูลของคุณได้รับการบันทึกเรียบร้อยแล้ว', 'success');
                setIsLoading(false);
                refreshSession();
            }).catch((err) => {
                console.log(err);
            })
        }


    }

    if (!userContext) return null;

    return (
        <WrapBackground color={colors.backgroundColor}>
            <Loading visible={isLoading} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Image source={require('@/assets/images/Union.png')} style={{ width: '100%' }} />
                <View style={{ width: '100%', height: '100%', alignSelf: 'center', padding: '10%', top: '-22.5%', gap: 10 }}>
                    <TouchableOpacity onPress={handleChoosePhoto} style={{ borderWidth: 1, borderRadius: 999, width: width * 0.31, height: width * 0.31, backgroundColor: colors.white, alignSelf: 'center' }}>
                        {userContext.user_profile_url !== '-' && <Image source={{ uri: userContext.user_profile_url }} style={{ width: '100%', height: '100%', borderRadius: 999 }} />}
                        <View style={{ position: 'absolute', alignItems: 'flex-end', right: 0, bottom: 0 }}>
                            <AddPhoto />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <FormInput
                            key="username"
                            iconHeader={<Iconify icon="ic:round-account-circle" size={25} color="#C8C8C8" />}
                            textContentType="username"
                            value={displayName}
                            onChangeText={setDisplayName}
                            placeholder={userContext.display_name}
                        />
                        <FormInput
                            key="phone"
                            iconHeader={<Iconify icon="mingcute:phone-fill" size={25} color="#C8C8C8" />}
                            textContentType="telephoneNumber"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder={userContext.phone_number}
                        />
                    </View>
                </View>
            </ScrollView>
        </WrapBackground>
    );
}