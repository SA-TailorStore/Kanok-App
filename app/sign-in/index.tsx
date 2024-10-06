import WrapBackground from "@/components/WrapBackground";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Iconify } from 'react-native-iconify';
import { FormInput } from "@/components/FormInput";
import { Link, useRouter } from "expo-router";
import { SetText } from "@/components/SetText";
import { ScrollView } from "react-native";
import { colors } from "@/utils/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "@/contexts/SessionContext";

const exampleUserData = {
    "status": "ok",
    "message": "Login success",
    "data": {
        "user_id": "1",
        "username": "admin",
        "display_name": "ภูมิระพี เสริญวณิชกุล",
        "password": "12345678",
        "phone_number": "0810000000",
        "user_profile_url": "https://www.w3schools.com/w3images/avatar2.png",
        "role": "user",
        "address": "123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110",
        "created_at": 1631155200,
    }
}

export default function SignIn() {
    const router = useRouter();
    const { setToken, getToken, checkRole } = useSession();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const signButtonClicked = async() => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/login', {
            username: username,
            password: password,
        }).then(async(res) => {
            console.log("Access Token: " + res.data.token);      
            setToken(res.data.token);
            // checkRole();
        }).catch((err) => {
            console.log('sign-in : ' + err)
        });
    }

    useEffect(() => {
        // get token from async storage
        // if token is not null, navigate to home
        // else, do nothing
        // const getToken = async () => {
        //     const token = await AsyncStorage.getItem('@access_token')
        //     console.log(token)
        //     if (token != null) {
        //         router.replace("/user-tab/home");
        //     }
        // }
        // getToken();
    }, [])

    return (
        <WrapBackground>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Image source={require('@/assets/images/logo-black.png')} style={styles.logo} />
                    <View style={styles.formContainer}>
                        <SetText type="bold" size={35}>ลงชื่อเข้าใช้งาน</SetText>
                        <View style={styles.formContent}>
                            <FormInput
                                key="username"
                                iconHeader={<Iconify icon="ic:round-account-circle" size={25} color="#C8C8C8" />}
                                textContentType="username"
                                value={username}
                                onChange={(e) => setUsername(e.nativeEvent.text)}
                                placeholder="ชื่อผู้ใช้งาน"
                            />
                            <FormInput
                                key="password"
                                iconHeader={<Iconify icon="mdi:password" size={25} color="#C8C8C8" />}
                                textContentType="password"
                                value={password}
                                onChange={(e) => setPassword(e.nativeEvent.text)}
                                placeholder="รหัสผ่าน"
                                eye
                            />
                            <SetText style={styles.errorText} color={colors.red}>The password isn't correct.</SetText>
                        </View>

                        <TouchableOpacity style={styles.signInButton} onPress={signButtonClicked}>
                            <SetText type="bold" color={colors.wherewhite} style={styles.signInButtonText}>เข้าสู่ระบบ</SetText>
                        </TouchableOpacity>

                        <View style={styles.signUpLinkContainer}>
                            <SetText>ยังไม่มีบัญชี?</SetText>
                            <Link href="/sign-up"><SetText color={colors.primary} style={styles.signUpLink}>สร้างบัญชี</SetText></Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </WrapBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        marginVertical: 40,
        width: 250,
        height: 250,
    },
    formContainer: {
        backgroundColor: '#F6F6F6',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 50,
        paddingVertical: 12,
        paddingTop: 30,
        flexDirection: 'column',
    },
    formContent: {
        paddingBottom: 32,
    },
    errorText: {
        position: 'absolute',
        bottom: 0,
        left: 12,
    },
    signInButton: {
        backgroundColor: colors.whereblack,
        width: '100%',
        paddingVertical: 8,
        marginTop: 8,
        borderRadius: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    signInButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    signUpLinkContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    signUpLink: {
        textDecorationLine: 'underline',
    },
});
