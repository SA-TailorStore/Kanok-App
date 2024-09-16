import WrapBackground from "@/components/WrapBackground";
import { Text, View, Image, StyleSheet } from "react-native";
import { Iconify } from 'react-native-iconify';
import { FormInput } from "@/components/FormInput";
import { Link, Redirect } from "expo-router";
import { ScrollView } from "react-native";
import { SetText } from "@/components/SetText";
import { colors } from "@/utils/styles";

export default function SignUp() {
    return (
        <WrapBackground>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Image source={require('@/assets/images/logo-black.png')} style={styles.logo} />
                    <View style={styles.formContainer}>
                        <SetText type="bold" style={styles.title}>สร้างบัญชี</SetText>
                        <View style={styles.formContent}>
                            <FormInput
                                key="username"
                                iconHeader={<Iconify icon="ic:round-account-circle" size={25} color="#C8C8C8" />}
                                textContentType="username"
                                placeholder="ชื่อผู้ใช้งาน"
                            />
                            <FormInput
                                key="phone"
                                iconHeader={<Iconify icon="mingcute:phone-fill" size={25} color="#C8C8C8" />}
                                textContentType="telephoneNumber"
                                placeholder="เบอร์โทรศัพท์"
                            />
                            <FormInput
                                key="password"
                                iconHeader={<Iconify icon="mdi:password" size={25} color="#C8C8C8" />}
                                textContentType="password"
                                placeholder="รหัสผ่าน"
                                eye
                            />
                            <FormInput
                                key="confirm-password"
                                iconHeader={<Iconify icon="mdi:password" size={25} color="#C8C8C8" />}
                                textContentType="password"
                                placeholder="ยืนยันรหัสผ่าน"
                                eye
                            />

                            <SetText color={colors.red} style={styles.errorText}>The password isn't correct.</SetText>
                        </View>

                        <View style={styles.signUpButton}>
                            <SetText color={colors.wherewhite} style={styles.signUpButtonText}>สร้างบัญชี</SetText>
                        </View>

                        <View style={styles.signUpLinkContainer} onTouchEnd={() => <Redirect href="/sign-in" />}>
                            <SetText>มีบัญชีอยู่แล้ว?</SetText>
                            <Link href="/sign-in"><SetText color={colors.primary} style={styles.signUpLink}>ลงชื่อเข้าใช้งาน</SetText></Link>
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
        width: 180,
        height: 180,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 50,
        paddingVertical: 12,
        flexDirection: 'column',
    },
    title: {
        fontSize: 32,
        paddingTop: 16,
    },
    formContent: {
        paddingBottom: 32,
    },
    errorText: {
        position: 'absolute',
        bottom: 0,
        left: 12,
        color: 'red',
    },
    signUpButton: {
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
    signUpButtonText: {
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
