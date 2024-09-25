import { FormInput } from "@/components/FormInput";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors } from "@/utils/styles";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";
import { Iconify } from "react-native-iconify";
import AddPhoto from "@/assets/icons/add_photo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaveButton = () => {
    return (
        <SetText size={20} type='bold' color={colors.white} style={{ opacity: 0.5 }}>บันทึก</SetText>
    );
}

export default function ChangeProfile() {
    const [user, setUser] = useState<any>({});
    const { width } = useWindowDimensions();

    useEffect(()=> {
        const getUser = async () => {
            // code here : get user data from @access_user
            const getStoredData = await AsyncStorage.getItem('@access_user');
            setUser(JSON.parse(getStoredData!).data);
        }
        getUser();
    });

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'โปรไฟล์ของฉัน',
            headerRight: () => <SaveButton />,
        });
    }, []);

    if (!user) return null;

    return (
        <WrapBackground color={colors.backgroundColor}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Image source={require('@/assets/images/Union.png')} style={{ width: '100%' }} />
                <View style={{ width: '100%', height: '100%', alignSelf: 'center', padding: '10%', top: '-22.5%', gap: 10 }}>
                    <View style={{ borderWidth: 1, borderRadius: 999, width: width * 0.31, height: width * 0.31, backgroundColor: colors.white, alignSelf: 'center' }}>
                        <Image source={require('@/assets/images/Avatar.png')} style={{ width: '100%', height: '100%', borderRadius: 999 }} />
                        <View style={{ alignItems: 'flex-end', marginTop: '-20%', paddingRight: '5%'}}>
                            <AddPhoto />
                        </View>
                    </View>
                    <View>
                        <FormInput
                            key="username"
                            iconHeader={<Iconify icon="ic:round-account-circle" size={25} color="#C8C8C8" />}
                            textContentType="username"
                            placeholder={user.display_name}
                        />
                        <FormInput
                            key="phone"
                            iconHeader={<Iconify icon="mingcute:phone-fill" size={25} color="#C8C8C8" />}
                            textContentType="telephoneNumber"
                            placeholder={user.phone_number}
                        />
                    </View>
                </View>
            </ScrollView>
        </WrapBackground>
    );
}