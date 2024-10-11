import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { IDesign } from "@/types/IDesign";
import { colors } from "@/utils/styles";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

type IDesignTag = {
    design_tag_id: number,
    type: string,
}

const tag: IDesignTag[] = [
    {
        design_tag_id: 0,
        type: "ทั้งหมด",
    },
    {
        design_tag_id: 1,
        type: "เสื้อ",
    },
    {
        design_tag_id: 2,
        type: "กางเกง",
    },
    {
        design_tag_id: 3,
        type: "กระโปรง",
    },
    {
        design_tag_id: 4,
        type: "เดรส",
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
            <SetText type={condition.isSelected} color={condition.color}>{item.type}</SetText>
        </View>
    );
}

const CardItem = ({ item }: { item: IDesign }) => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push(`/user-stack/add-information/${item.design_id}`)} style={{ width: '45%', height: 260, marginBottom: 10 }}>
            <View style={{ width: '100%', height: 200, borderRadius: 10 }}>
                <Image source={{ uri: item.design_url }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
            </View>
            <View style={{ width: '100%', paddingHorizontal: '5%', paddingTop: '2%' }}>
                <SetText type='bold'>no.{item.design_id}</SetText>
                <SetText type='small' color={colors.grey}>ประเภท: {item.type}</SetText>
            </View>
        </TouchableOpacity>
    );
}

export default function ChooseDesignUser() {
    const navigation = useNavigation();
    const [selectedTag, setSelectedTag] = useState<number>(0);
    const [designData, setDesignData] = useState<IDesign[]>([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
        });
        getDesign();
    }, []);

    const getDesign = async () => {
        await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/designs').then((res) => {
            if (res.data.data) {
                setDesignData(res.data.data)
            } else {
                setDesignData([]);
            };
        }).catch((err) => { console.log(err) })
    }


    const filteredData = () => {
        return designData.filter((item: IDesign) => {
            if (selectedTag === 0) {
                return true;
            } else {
                return item.type === tag.find((i) => i.design_tag_id === selectedTag)?.type
            }
        })
    }

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ marginTop: '15%', marginHorizontal: '5%' }}>
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
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{ marginTop: '5%', marginHorizontal: '5%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {filteredData().map((item: any, index: number) => {
                        return (
                            <CardItem key={index} item={item} />
                        )
                    })}
                </View>
            </ScrollView>
        </WrapBackground>
    );
}