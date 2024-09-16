import { TextInput, type TextInputProps, StyleSheet, View, SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Iconify } from 'react-native-iconify';

export type FormInputProps = TextInputProps & {
    type?: 'default' | 'bold';
    iconHeader?: React.ReactDOM | any;
    eye?: boolean;
};

export function FormInput({
    type = 'default',
    ...rest
}: FormInputProps) {
    const [showPassword, setShowPassword] = useState<boolean | undefined>(false);

    const [loaded] = useFonts({
        notoSansThai: require('@/assets/fonts/Noto_Sans_Thai/NotoSansThai-Regular.ttf'),
        notoSansThaiBold: require('@/assets/fonts/Noto_Sans_Thai/NotoSansThai_Condensed-Bold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TextInput style={[,
                type == 'default' ? styles.default : undefined,
                type === 'bold' ? styles.bold : undefined,
                styles.textInput,
            ]} {...rest} secureTextEntry={rest.eye && !showPassword} />
            <SafeAreaView style={styles.iconContainer}>
                {rest.iconHeader}
                {rest.eye && <View onTouchEnd={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Iconify icon="mdi:eye-outline" size={25} color="#C8C8C8" /> : <Iconify icon="mdi:eye-off-outline" size={25} color="#C8C8C8" />}
                </View>}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'notoSansThai',
    },
    bold: {
        fontFamily: 'notoSansThaiBold',
    },
    container: {
        marginTop: 20, // mt-5
        position: 'relative',
        justifyContent: 'center',
        height: 50,
    },
    textInput: {
        paddingLeft: 48, // pl-12
        paddingRight: 64, // pr-16
        paddingVertical: 8, // py-2
        height: "auto",
        borderRadius: 999, // rounded-full
        backgroundColor: 'white',
        // Add custom shadow here if needed
        // e.g., shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
    },
    iconContainer: {
        position: 'absolute',
        left: 12, // left-3
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingRight: 25, // pr-3
    },
});