import { colors, styles } from "@/utils/styles";
import { View, Animated, Easing, TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";
import { SetText } from "./SetText";
import { useEffect, useState, useRef } from "react";

export default function Toast({ title, message, dura }: { title: string, message: string; dura: number }) {
    const [duration, setDuration] = useState<number>(4000);
    const [isEnd, setEnd] = useState<boolean>(false);
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 100,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
            setEnd(true);
        });
    }, []);

    const widthInterpolate = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
    });

    if (isEnd) return null;

    return (
        <View style={[styles.toastContainer, styles.shadowCustom]}> 
            <View style={[styles.toastTop]}>
                <View style={styles.toastIcon}>
                    <Iconify icon="material-symbols:check-circle" size={22} color={colors.success} />
                </View>
                <View style={styles.toastHeader}>
                    <SetText type="bold" size={18} color={colors.whereblack} style={{ marginBottom: -5 }}>
                        {title}
                    </SetText>
                    <SetText color={colors.grey} size={12}>
                        {message}
                    </SetText>
                </View>
                <TouchableOpacity onPress={() => {setEnd(true)}} style={[styles.toastIcon, { position: 'absolute', right: 0, alignSelf: 'center' }]}>
                    <Iconify icon="mingcute:close-fill" size={22} color={colors.grey} />
                </TouchableOpacity>
            </View>
            <Animated.View style={{ width: widthInterpolate, height: 100, backgroundColor: colors.success }} />
        </View>
    );
}
