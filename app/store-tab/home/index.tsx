import { SetText } from "@/components/SetText";
import { Image, TouchableOpacity, View } from "react-native";
import { colors, styles } from "@/utils/styles";
import { useRouter } from "expo-router";
import Knitwork from "@/assets/icons/knitwork";
import WrapBackground from "@/components/WrapBackground";
import { Iconify } from "react-native-iconify";
import { useEffect } from "react";
import { useSession } from "@/contexts/SessionContext";

export type ChoiceProps = {
    title: string;
    icon: JSX.Element;
    to?: () => void;
}

export default function HomePage() {
    const router = useRouter();
    const { userContext } = useSession();

    useEffect(() => {
        if (userContext.display_name.length < 5 && userContext.address.length < 5 && userContext.phone_number.length < 5) {
            router.push('/user-stack/my-address');
        }
    },[]); 

    return (
        <WrapBackground color={colors.mediumpink}>
            <View style={styles.logoUserContainer}>
                <Image source={require('@/assets/images/logo-with-kanok.png')} />
                <Image source={require('@/assets/images/Avatar.png')} style={styles.avatar} />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={[styles.formContainer, { paddingHorizontal: 0 }, styles.shadowCustom3]}>
                    <View style={{ paddingHorizontal: 30, height: '100%' }}>
                        <SetText size={27} type="bold" style={{ paddingTop: 14 }}>เลือกหมวดหมู่ที่ต้องการ</SetText>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 15 }}>
                            <ItemChoice title="ออเดอร์" icon={<Iconify icon="lets-icons:order-fill" size={60} color={colors.mediumpink} />} to={() => router.push('/store-stack/order')} />
                            <ItemChoice title="แบบดีไซน์" icon={<Iconify icon="mdi:clothes-hanger" size={60} color={colors.mediumpink} />} to={()=>router.push('/store-stack/design')} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 15, }}>
                            <ItemChoice title="วัสดุ" icon={<Knitwork/>} to={()=>router.push('/store-stack/material')}/>
                            <ItemChoice title="ลายผ้า" icon={<Iconify icon="game-icons:rolled-cloth" size={60} color={colors.mediumpink} />} to={()=>router.push('/store-stack/fabric')} />
                        </View>
                    </View>
                </View>
            </View>
        </WrapBackground>
    );
}

const ItemChoice = ({title, icon, to}:ChoiceProps) => {
    return (
        <TouchableOpacity style={[styles.choiceItem, styles.shadowCustom, { gap: 4, flex: 1, height: 120, width: '100%' }]} onPress={to} >
            {icon}
            <SetText type="bold">{title}</SetText>
        </TouchableOpacity>
    )
}