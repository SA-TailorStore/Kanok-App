import { TextInput, type TextInputProps, StyleSheet, View, SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Iconify } from 'react-native-iconify';
import { styles } from '@/utils/styles';

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
        <View style={[stylesForm.container, styles.shadowCustom]}>
            <TextInput style={[,
                type == 'default' ? stylesForm.default : undefined,
                type === 'bold' ? stylesForm.bold : undefined,
                stylesForm.textInput,
            ]} {...rest} secureTextEntry={rest.eye && !showPassword} />
            <SafeAreaView style={stylesForm.iconContainer}>
                {rest.iconHeader}
                {rest.eye && <View onTouchEnd={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Iconify icon="mdi:eye-outline" size={25} color="#C8C8C8" /> : <Iconify icon="mdi:eye-off-outline" size={25} color="#C8C8C8" />}
                </View>}
            </SafeAreaView>
        </View>
    );
}

const stylesForm = StyleSheet.create({
    default: {
        fontFamily: 'notoSansThai',
    },
    bold: {
        fontFamily: 'notoSansThaiBold',
    },
    container: {
        marginTop: 20, 
        position: 'relative',
        justifyContent: 'center',
        borderRadius:999,
        height: 50,
    },
    textInput: {
        paddingLeft: 48,
        paddingRight: 64,
        paddingVertical: 8, 
        height: "auto",
        borderRadius: 999,
        backgroundColor: 'white',
    },
    iconContainer: {
        position: 'absolute',
        left: 12,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingRight: 25, 
    },
});