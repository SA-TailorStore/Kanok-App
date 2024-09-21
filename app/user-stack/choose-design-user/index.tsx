import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, headerTitleStyle, styles } from "@/utils/styles";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

type IDesign = {
    design_id: number,
    name: string,
    type: "เสื้อ" | "กางเกง" | "กระโปรง" | "เดรส",
    image_url: string,
    created_by?: number, // อาจไม่ต้องมีแล้วเพราะร้านค้าเป็นคน update เสื้อ
    created_at?: Date
}

type IDesignTag = {
    design_tag_id: number,
    name: string,
}

const tag: IDesignTag[] = [
    {
        design_tag_id: 0,
        name: "ทั้งหมด",
    },
    {
        design_tag_id: 1,
        name: "เสื้อ",
    },
    {
        design_tag_id: 2,
        name: "กางเกง",
    },
    {
        design_tag_id: 3,
        name: "กระโปรง",
    },
    {
        design_tag_id: 4,
        name: "เดรส",
    }
];

const exampleTagDataSource: IDesign[] = [
    {
        design_id: 0,
        name: "ผ้าฝ้าย",
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 1,
        name: "ผ้าฝ้าย",
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 2,
        name: "ผ้าฝ้าย",
        type: "เดรส",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 3,
        name: "ผ้าฝ้าย",
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 4,
        name: "ผ้าฝ้าย",
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 0,
        name: "ผ้าฝ้าย",
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 1,
        name: "ผ้าฝ้าย",
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 2,
        name: "ผ้าฝ้าย",
        type: "เดรส",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 3,
        name: "ผ้าฝ้าย",
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 4,
        name: "ผ้าฝ้าย",
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 0,
        name: "ผ้าฝ้าย",
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 1,
        name: "ผ้าฝ้าย",
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 2,
        name: "ผ้าฝ้าย",
        type: "เดรส",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 3,
        name: "ผ้าฝ้าย",
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 4,
        name: "ผ้าฝ้าย",
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 0,
        name: "ผ้าฝ้าย",
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 1,
        name: "ผ้าฝ้าย",
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 2,
        name: "ผ้าฝ้าย",
        type: "เดรส",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 3,
        name: "ผ้าฝ้าย",
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 4,
        name: "ผ้าฝ้าย",
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    }
];

const TagItem = ({ item, isSelected, setSelectedTag }: { item: IDesignTag, isSelected?: boolean, setSelectedTag?: React.Dispatch<React.SetStateAction<number>>; }) => {
    type ICondition = {
        borderColor: string,
        isSelected: 'bold' | 'default',
        color: string
    }

    const condition: ICondition = {
        borderColor: isSelected ? colors.mediumpink : colors.grey,
        isSelected: isSelected ? 'bold' : 'default',
        color: isSelected ? colors.black : colors.grey
    }

    return (
        <View onTouchEnd={() => setSelectedTag ? setSelectedTag(item.design_tag_id) : undefined} style={{ borderBottomWidth: 2, width: '20%', alignItems: 'center', paddingBottom: 4, borderColor: isSelected ? colors.mediumpink : colors.grey }}>
            <SetText type={condition.isSelected} color={condition.color}>{item.name}</SetText>
        </View>
    );
}

const CardItem = () => {
    return (
        <TouchableOpacity onPress={() => console.log('selected card item')} style={{ width: '45%', height: 260, marginBottom: 10 }}>
            <View style={{ width: '100%', height: 200, borderRadius: 10 }}>
                <Image source={require('@/assets/images/promote.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
            </View>
            <View style={{ width: '100%', paddingHorizontal: '5%', paddingTop: '2%' }}>
                <SetText type='bold'>no.1</SetText>
                <SetText type='small' color={colors.grey}>ประเภท: เสื้อ</SetText>
            </View>
        </TouchableOpacity>
    );
}

export default function ChooseDesignUser() {
    const navigation = useNavigation();
    const [scrollY, setScrollY] = useState<number>(0);
    const [selectedTag, setSelectedTag] = useState<number>(0);

    useEffect(() => {
        let title = ''
        if (scrollY > 80) {
            title = 'เลือกแบบที่ต้องการ'
        } else {
            title = ''
        }

        navigation.setOptions({
            headerTitle: title,
        });

    }, [scrollY]);
    return (
        <WrapBackground color={colors.backgroundColor}>
            {scrollY > 80 && <View style={{ borderBottomWidth: 0.5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderColor: colors.grey, position: 'absolute', paddingTop: '15%', backgroundColor: colors.white, zIndex: 100}}>
                {tag.map((item: IDesignTag, index: number) => {
                    return (
                        <TagItem key={index} item={item} isSelected={selectedTag === item.design_tag_id ? true : false} setSelectedTag={setSelectedTag} />
                    )
                })}
            </View>}
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }} onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => setScrollY(e.nativeEvent.contentOffset.y)}>
                <View style={{ marginTop: '15%', marginHorizontal: '5%', opacity: scrollY > 80? 0 : (100-scrollY)/100 }}>
                    <SetText size={24} type="bold">เลือกแบบที่ต้องการ</SetText>
                    <SetText size={16}>เลือกแบบที่คุณต้องการ</SetText>
                </View>
                <View style={{ borderBottomWidth: 0.5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderColor: colors.grey, paddingTop: 22 }}>
                    {tag.map((item: IDesignTag, index: number) => {
                        return (
                            <TagItem key={index} item={item} isSelected={selectedTag === item.design_tag_id ? true : false} setSelectedTag={setSelectedTag} />
                        )
                    })}
                </View>
                <View style={{ marginTop: '5%', marginHorizontal: '5%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {exampleTagDataSource.map((item: any, index: number) => {
                        return (
                            <CardItem key={index} />
                        )
                    })}
                </View>
            </ScrollView>
        </WrapBackground>
    );
}