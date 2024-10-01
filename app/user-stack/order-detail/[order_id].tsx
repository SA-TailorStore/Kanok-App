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

export default function OrderDetail() {
    const [photo, setPhoto] = useState<any>(null);

    const route = useRoute() as { params: { order_id: string } };
    const router = useRouter();
    const navigation = useNavigation();
    const { order_id } = route.params;

    const { showToast } = useToast();

    useEffect(() => {
        console.log(order_id);
        navigation.setOptions({
            headerTitle: "รายละเอียดคำสั่งซื้อ",
        });
    }, [])

    const { width } = Dimensions.get('window');

    return (
        <WrapBackground color={colors.backgroundColor}>
            <Loading visible={false} text='กำลังตรวจสอบข้อมูล...' />
        </WrapBackground>
    );
}

