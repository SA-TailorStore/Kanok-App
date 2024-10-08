import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Alert } from "react-native";
import { Iconify } from "react-native-iconify";
import RNPickerSelect from 'react-native-picker-select';
import { Dropdown } from 'react-native-element-dropdown';

type IDesign = {
    design_id: number,
    type: "เสื้อ" | "กางเกง" | "กระโปรง" | "เดรส",
    image_url: string,
    created_by?: number, // อาจไม่ต้องมีแล้วเพราะร้านค้าเป็นคน update เสื้อ
    created_at?: Date
}

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

const exampleTagDataSource: IDesign[] = [
    {
        design_id: 0,
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 1,
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 2,
        type: "เดรส",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 3,
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 4,
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 5,
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 6,
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 7,
        type: "เดรส",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 8,
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 9,
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 10,
        type: "กระโปรง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 11,
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 12,
        type: "เดรส",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 13,
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 14,
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 15,
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 16,
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 17,
        type: "เดรส",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 18,
        type: "เสื้อ",
        image_url: "@/assets/images/promote.png",
    },
    {
        design_id: 19,
        type: "กางเกง",
        image_url: "@/assets/images/promote.png",
    }
];


const createTwoButtonAlert = () =>
    Alert.alert('แน่ใจหรือไม่ว่าต้องการลบ', 'แน่ใจหรือไม่ว่าต้องการลบแบบที่คุณเลือก', [
        {
            text: 'ยกเลิก',
            onPress: () => console.log('ยกเลิก'),
            style: 'cancel',
        },
        {
            text: 'ลบ', onPress: () => console.log('ลบ')
        },
    ]);

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
        <View style={{ width: '45%', height: 260, marginBottom: 10 }}>
            <TouchableOpacity onPress={() => router.push(`/user-stack/add-information/${item.design_id}`)} style={{ width: '100%', height: 200, borderRadius: 10 }}>
                <Image source={require('@/assets/images/promote.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: '100%', paddingHorizontal: '5%', paddingTop: '2%' }}>
                    <SetText type='bold'>no.{item.design_id}</SetText>
                    <SetText type='small' color={colors.grey}>ประเภท: {item.type}</SetText>
                </View>
                <Iconify onTouchEnd={() => createTwoButtonAlert()} icon="solar:trash-bin-trash-line-duotone" size={20} color={colors.mediumpink} style={{ position: 'absolute', right: 10, top: 10 }} />
            </View>

        </View>
    );
}

export default function Design() {
    const navigation = useNavigation();
    const [scrollY, setScrollY] = useState<number>(0);
    const [selectedTag, setSelectedTag] = useState<number>(0);
    const [isPopup, setIsPopup] = useState<boolean>(false);

    useEffect(() => {
        let title = ''
        if (scrollY > 80) {
            title = 'จัดการดีไซน์ของคุณ'
        } else {
            title = ''
        }

        navigation.setOptions({
            headerTitle: title,
        });

    }, [scrollY]);

    const filteredData = () => {
        return exampleTagDataSource.filter((item: IDesign) => {
            if (selectedTag === 0) {
                return true;
            } else {
                return item.type === tag.find((i) => i.design_tag_id === selectedTag)?.type
            }
        })
    }

    return (
        <WrapBackground color={colors.backgroundColor}>
            {scrollY > 80 && <View style={{ borderBottomWidth: 0.5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderColor: colors.grey, position: 'absolute', paddingTop: '15%', backgroundColor: colors.white, zIndex: 100 }}>
                {tag.map((item: IDesignTag, index: number) => {
                    return (
                        <TagItem key={index} item={item} isSelected={selectedTag === item.design_tag_id ? true : false} setSelectedTag={setSelectedTag} />
                    )
                })}
            </View>}
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }} onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => setScrollY(e.nativeEvent.contentOffset.y)}>
                <View style={{ marginTop: '15%', marginHorizontal: '5%', opacity: scrollY > 80 ? 0 : (100 - scrollY) / 100 }}>
                    <SetText size={24} type="bold">จัดการดีไซน์ของคุณ</SetText>
                    <SetText size={16}>เพิ่มแบบที่คุณต้องการ</SetText>
                </View>
                <View style={{ borderBottomWidth: 0.5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderColor: colors.grey, paddingTop: 22 }}>
                    {tag.map((item: IDesignTag, index: number) => {
                        return (
                            <TagItem key={index} item={item} isSelected={selectedTag === item.design_tag_id ? true : false} setSelectedTag={setSelectedTag} />
                        )
                    })}
                </View>
                <View style={{ marginTop: '5%', marginHorizontal: '5%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {filteredData().map((item: any, index: number) => {
                        return (
                            <CardItem key={index} item={item} />
                        )
                    })}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => setIsPopup(true)} style={{ position: 'absolute', width: 70, height: 70, bottom: 0, right: 0, margin: 15, borderRadius: 999, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...styles.shadowCustom }}>
                <Iconify icon='fluent-emoji-high-contrast:plus' size={40} color={colors.mediumpink} />
            </TouchableOpacity>
            {isPopup && <Popup action="add" setIsShow={setIsPopup} />}
        </WrapBackground>
    );
}

const Popup = ({ action, design_id, setIsShow }: { action: 'add' | 'edit', design_id?: string, setIsShow: (value: boolean) => void }) => {
    const [name, setName] = useState<string>('');
    const [value, setValue] = useState<any>(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: colors.backgroundColor, width: '100%', height: '60%', position: 'absolute', bottom: 0, alignSelf: 'center', borderRadius: 16, padding: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SetText type="bold" size={20}>{action === 'add' ? 'เพิ่มแบบ' : 'แก้ไขแบบ'}</SetText>
                    <TouchableOpacity onPress={() => setIsShow(false)}><Iconify icon="bx:bx-x" size={24} color={colors.grey} /></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', gap: 5, marginTop: 20 }}>
                    <SetText type='bold' color={colors.whereblack} size={16}>ประเภท</SetText>
                    <Dropdown
                        style={[{
                            margin: 0,
                            height: 40,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 0.5,
                        }, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={{ fontSize: 16, fontFamily: 'notoSansThai', color: colors.grey }}
                        selectedTextStyle={{ fontSize: 16, fontFamily: 'notoSansThai' }}
                        itemTextStyle={{ fontSize: 16, fontFamily: 'notoSansThai' }}
                        data={tag.slice(1).map((item: IDesignTag) => { return { label: item.type, value: item.design_tag_id } })}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'กรุณาเลือกประเภท' : 'กำลังเลือก...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>
                <View style={{ marginTop: 20, borderColor: colors.line, paddingBottom: 20, gap: 10 }}>
                    <SetText style={{ marginTop: 8 }} type="bold">อัปโหลดแบบที่ต้องการ</SetText>
                    <TouchableOpacity style={{ width: 160, height: 224, borderRadius: 8, ...styles.shadowCustom, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
                        <Iconify icon="bx:bx-image-add" size={40} color={colors.grey} />
                    </TouchableOpacity>
                </View>
                {/* <View style={{ flexDirection: 'column', gap: 5 }}>
                    <SetText type='bold' color={colors.whereblack} size={16}>ประเภท</SetText>
                    <Dropdown
                        
                        style={[{
                            margin: 0,
                            height: 40,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 0.5,
                        }, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={{ fontSize: 16, fontFamily: 'notoSansThai', color: colors.grey }}
                        selectedTextStyle={{ fontSize: 16, fontFamily: 'notoSansThai' }}
                        itemTextStyle={{ fontSize: 16, fontFamily: 'notoSansThai' }}
                        data={tag.slice(1).map((item: IDesignTag) => { return { label: item.type, value: item.design_tag_id } })}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'กรุณาเลือกประเภท' : 'กำลังเลือก...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View> */}
            </View>
            <TouchableOpacity disabled={!(name.length > 0)} style={{ borderTopWidth: 0.5, marginTop: 10, position: 'absolute', bottom: 0, height: 80, width: '100%', borderTopStartRadius: 8, borderTopEndRadius: 8, justifyContent: 'center', paddingHorizontal: 20, borderColor: colors.line }}>
                <View style={{ padding: 10, alignItems: 'center', borderRadius: 999, backgroundColor: name.length > 0 ? colors.mediumpink : colors.lesspink }}>
                    <SetText type='bold' color={colors.white}>บันทึก</SetText>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const DropdownComponent = () => {
    const [value, setValue] = useState<any>(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <Dropdown
            style={[{
                margin: 0,
                height: 40,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
            }, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={{ fontSize: 16, fontFamily: 'notoSansThai', color: colors.grey }}
            selectedTextStyle={{ fontSize: 16, fontFamily: 'notoSansThai' }}
            itemTextStyle={{ fontSize: 16, fontFamily: 'notoSansThai' }}
            data={tag.slice(1).map((item: IDesignTag) => { return { label: item.type, value: item.design_tag_id } })}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'กรุณาเลือกประเภท' : 'กำลังเลือก...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
            }}
        />
    );
};