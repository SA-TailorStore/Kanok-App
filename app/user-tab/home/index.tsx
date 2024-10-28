import { SetText } from "@/components/SetText";
import { Image, TouchableOpacity, View, type ImageSourcePropType } from "react-native";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import Knitwork from "@/assets/icons/knitwork";
import StoreFront from "@/assets/icons/storefront-plus";
import Slider from "@/components/Slider";
import WrapBackground from "@/components/WrapBackground";
import { useSession } from "@/contexts/SessionContext";
import { useEffect } from "react";

export type ChoiceProps = {
    title: string;
    icon: JSX.Element;
    to?: ()=>void;
}

export type SliderItemProps = {
    title: string;
    img_url: ImageSourcePropType;
}

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
    const { userContext } = useSession();

    useEffect(() => {
        if (userContext.display_name.length < 5 && userContext.address.length < 5 && userContext.phone_number.length < 5) {
            router.push('/user-stack/my-address');
        }
    },[]); 

    const choice: ChoiceProps[] = [
        // {
        //     title: "แบบของร้าน",
        //     icon: <StoreFront />,
        //     to: ()=>router.push('/user-stack/choose-design-user')
        // },
        {
            title: "เลือกแบบที่ต้องการ",
            icon: <Knitwork />,
            to: ()=>router.push('/user-stack/manage-design')
        },
    ]

    return (
        <WrapBackground color={colors.mediumpink}>
            <View style={styles.logoUserContainer}>
                <Image source={require('@/assets/images/logo-with-kanok.png')} />
                <Image source={require('@/assets/images/Avatar.png')} style={styles.avatar} />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={[styles.formContainer, { paddingHorizontal: 0 }, styles.shadowCustom3]}>
                    <View style={{ paddingHorizontal: 30 }}>
                        <SetText size={27} type="bold" style={{ paddingTop: 14 }}>สั่งตัดเสื้อผ้า</SetText>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {choice.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={[styles.choiceItem, styles.shadowCustom, {gap: 5}]} onPress={item.to}>
                                        {item.icon}
                                        <SetText type="bold">{item.title}</SetText>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>

                    <Slider items={ads} />
                </View>
            </View>            
        </WrapBackground>
    );
}