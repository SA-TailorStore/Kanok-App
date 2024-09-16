import { SetText } from "@/components/SetText";
import { Image, View, type ImageSourcePropType } from "react-native";
import { colors, styles } from "@/utils/styles";
import { useRouter } from "expo-router";
import Knitwork from "@/assets/icons/knitwork";
import StoreFront from "@/assets/icons/storefront-plus";
import Slider from "@/components/Slider";
import UserTemplate from "@/components/UserTemplate";
import { ScrollView } from "react-native";

export type ChoiceProps = {
    title: string;
    icon: JSX.Element;
    to?: string;
}

export type SliderItemProps = {
    title: string;
    img_url: ImageSourcePropType;
}

const choice: ChoiceProps[] = [
    {
        title: "แบบของร้าน",
        icon: <StoreFront />,
        to: "/"
    },
    {
        title: "แบบของฉัน",
        icon: <Knitwork />,
        to: "/"
    },
]

const ads: SliderItemProps[] = [
    {
        title: "โปรโมชั่น",
        img_url: require('@/assets/images/promote.png')
    },
    {
        title: "2",
        img_url: require('@/assets/images/loading.png')
    },
    {
        title: "3",
        img_url: require('@/assets/images/loading.png')
    }
]

export default function HomePage() {
    const router = useRouter();

    return (
        <UserTemplate>
            <View style={styles.logoUserContainer}>
                <Image source={require('@/assets/images/logo-with-kanok.png')} />
                <Image source={require('@/assets/images/Avatar.png')} style={styles.avatar} />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={[styles.formContainer, { paddingHorizontal: 0 }, styles.shadowCustom3]}>
                    <View style={{ paddingHorizontal: 30 }}>
                        <SetText size={27} type="bold" style={{ paddingTop: 14 }}>เลือกรูปแบบการสั่งตัด</SetText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {choice.map((item, index) => {
                                return (
                                    <View key={index} style={[styles.choiceItem, styles.shadowCustom, {gap: 5}]} onTouchEnd={() => router.push('/')}>
                                        {item.icon}
                                        <SetText type="bold">{item.title}</SetText>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <Slider items={ads} />

                    <View style={[styles.orderCurrentContainer, styles.shadowCustom]}>
                        <SetText style={{ color: colors.grey }}>ยังไม่มีคำสั่งซื้อในปัจจุบัน</SetText>
                    </View>
                </View>
            </View>            
        </UserTemplate>
    );
}