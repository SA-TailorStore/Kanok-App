import WrapBackground from "@/components/WrapBackground";
import { Text, View, Image, StyleSheet } from "react-native";
import { Iconify } from 'react-native-iconify';
import { FormInput } from "@/components/FormInput";
import { Link, useRouter } from "expo-router";
import { SetText } from "@/components/SetText";
import { ScrollView } from "react-native";
import { colors } from "@/utils/styles";

export default function SignIn() {
    const router = useRouter();
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
                                placeholder="ชื่อผู้ใช้งาน"
                            />
                            <FormInput
                                key="password"
                                iconHeader={<Iconify icon="mdi:password" size={25} color="#C8C8C8" />}
                                textContentType="password"
                                placeholder="รหัสผ่าน"
                                eye
                            />
                            <SetText style={styles.errorText} color={colors.red}>The password isn't correct.</SetText>
                        </View>

                        <View style={styles.signInButton} onTouchEnd={() => router.push('/user/home-page')}>
                            <SetText type="bold" color={colors.wherewhite} style={styles.signInButtonText}>เข้าสู่ระบบ</SetText>
                        </View>

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
