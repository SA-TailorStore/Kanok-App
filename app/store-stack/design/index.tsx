import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, styles } from "@/utils/styles";
import { router, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Alert } from "react-native";
import { Iconify } from "react-native-iconify";
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { useToast } from "@/contexts/ToastContext";

type IDesign = {
    design_id: number,
    type: "เสื้อ" | "กางเกง" | "กระโปรง" | "เดรส",
    design_url: string,
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



export default function Design() {
    const navigation = useNavigation();
    const [scrollY, setScrollY] = useState<number>(0);
    const [selectedTag, setSelectedTag] = useState<number>(0);
    const [isPopupAdd, setIsPopupAdd] = useState<boolean>(false);
    const [isPopupEdit, setIsPopupEdit] = useState<boolean>(false);
    const [designId, setDesignId] = useState<number>(0);
    const [designData, setDesignData] = useState<IDesign[]>([]);
    const { showToast } = useToast();

    const CardItem = ({ item, setDesignId, setPopup }: { item: IDesign, setDesignId: (value: number) => void, setPopup: (value: boolean) => void }) => {
        const router = useRouter();
    
        return (
            <View style={{ width: '45%', height: 260, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    setDesignId(item.design_id);
                    setPopup(true);
                }} style={{ width: '100%', height: 200, borderRadius: 10 }}>
                    <Image
                        source={{ uri: item.design_url }}
                        style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ width: '100%', paddingHorizontal: '5%', paddingTop: '2%' }}>
                        <SetText type='bold'>no.{item.design_id}</SetText>
                        <SetText type='small' color={colors.grey}>ประเภท: {item.type}</SetText>
                    </View>
                    <Iconify onTouchEnd={() => createTwoButtonAlert(item.design_id)} icon="solar:trash-bin-trash-line-duotone" size={20} color={colors.mediumpink} style={{ position: 'absolute', right: 10, top: 10 }} />
                </View>
    
            </View>
        );
    }

    const createTwoButtonAlert = (design_id: number) =>
        Alert.alert('แน่ใจหรือไม่ว่าต้องการลบ', 'แน่ใจหรือไม่ว่าต้องการลบแบบที่คุณเลือก', [
            {
                text: 'ยกเลิก',
                onPress: () => console.log('ยกเลิก'),
                style: 'cancel',
            },
            {
                text: 'ลบ', onPress: () => {
                    axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/design/delete/', {
                        design_id: design_id
                    }).then((res) => {
                        getDesign();
                        showToast('ลบดีไซน์สำเร็จ', `ลบดีไซน์ id: ${design_id} ของคุณสำเร็จ`, 'success');
                    }).catch((err) => {
                        console.log(err.response);
                    })
                }
            },
        ]);

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

    const getDesign = async () => {
        await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/designs').then((res) => {
            if (res.data.data) setDesignData(res.data.data);
        }).catch((err) => { console.log(err) })
    }

    useEffect(() => {
        getDesign();
    }, [isPopupAdd, isPopupEdit])

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
            {scrollY > 80 && <View style={{ borderBottomWidth: 0.5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderColor: colors.grey, position: 'absolute', paddingTop: '15%', backgroundColor: colors.white, zIndex: 100 }}>
                {tag.map((item: IDesignTag, index: number) => {
                    return (
                        <TagItem key={index} item={item} isSelected={selectedTag === item.design_tag_id ? true : false} setSelectedTag={setSelectedTag} />
                    )
                })}
            </View>}
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => setScrollY(e.nativeEvent.contentOffset.y)}>
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
                    {designData.length > 0 ? filteredData().map((item: any, index: number) => {
                        return (
                            <CardItem key={index} item={item} setDesignId={setDesignId} setPopup={setIsPopupEdit} />
                        )
                    }) : <SetText style={{ width: '100%', textAlign: 'center' }} size={16} color={colors.grey}>No Data</SetText>}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => setIsPopupAdd(true)} style={{ position: 'absolute', width: 70, height: 70, bottom: 0, right: 0, margin: 15, borderRadius: 999, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...styles.shadowCustom }}>
                <Iconify icon='fluent-emoji-high-contrast:plus' size={40} color={colors.mediumpink} />
            </TouchableOpacity>
            {isPopupAdd && <Popup action="add" setIsShow={setIsPopupAdd} />}
            {isPopupEdit && <Popup action="edit" design_id={designId} setIsShow={setIsPopupEdit} />}
        </WrapBackground>
    );
}

const Popup = ({ action, design_id, setIsShow }: { action: 'add' | 'edit', design_id?: number, setIsShow: (value: boolean) => void }) => {
    const [value, setValue] = useState<string>('');
    const [isFocus, setIsFocus] = useState(false);
    const [photo, setPhoto] = useState<string | null>(null);
    const { showToast } = useToast();
    const [buttonDelay, setButtonDelay] = useState<boolean>(false);
    
    let formDataUpdate = new FormData() as any;

    const getDesign = async () => {
        console.log(process.env.EXPO_PUBLIC_API_URL + '/api/design/get');
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/design/get', { design_id: design_id }).then((res) => {
            if (res.data.data) {
                const data = res.data.data;
                setValue(data.type);
                setPhoto(data.design_url);
            }
        }).catch((err) => { console.log(err) })
    }

    useEffect(() => {
        if (action === 'edit') {
            getDesign();
        }
    },[])

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5
        });

        console.log(result);

        if (!result.canceled) {
            if (action === 'edit') {
                formDataUpdate.append('image', {
                    uri: result.assets[0].uri,
                    name: 'image.jpg',
                    type: 'image/jpg'
                });
                setPhoto(result.assets[0].uri);
            } else {
                setPhoto(result.assets[0].uri);
            }

        }
    }

    const uploadtoServer = async (uri: string) => {
        const PATH = action === "add" ? process.env.EXPO_PUBLIC_API_URL + '/api/design/add' : process.env.EXPO_PUBLIC_API_URL + '/api/design/update';

        let formData = new FormData() as any;
        formData.append('type', 'เสื้อ');
        formData.append('image', {
            uri: uri,
            name: 'image.jpg',
            type: 'image/jpg'
        });

        try {
            const response = await axios.post(PATH, action === "add" ? formData : formDataUpdate, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response?.status === 201) {
                showToast('เพิ่มแบบสำเร็จ', 'คุณได้เพิ่มแบบสำเร็จแล้ว', 'success');
                setIsShow(false);
            } else if (response?.status === 204) {
                showToast('แก้ไขแบบสำเร็จ', 'คุณได้แก้ไขแบบสำเร็จแล้ว', 'success');
                setIsShow(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveButton = async () => {
        setButtonDelay(true);
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }
        console.log(photo)

        uploadtoServer(photo!);
    }

    return (
        <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: colors.backgroundColor, width: '100%', height: '65%', position: 'absolute', bottom: 0, alignSelf: 'center', borderRadius: 16, padding: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SetText type="bold" size={20}>{action === 'add' ? 'เพิ่มแบบ' : 'แก้ไขแบบ'}</SetText>
                    <TouchableOpacity onPress={() => setIsShow(false)}><Iconify icon="bx:bx-x" size={24} color={colors.grey} /></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', gap: 5, marginTop: 20 }}>
                    <SetText type='bold' color={colors.whereblack} size={16}>ประเภท {design_id}</SetText>
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
                        data={tag.slice(1).map((item: IDesignTag) => { return { label: item.type, value: item.type } })}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'กรุณาเลือกประเภท' : 'กำลังเลือก...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            formDataUpdate.append('type', item.value);
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>
                <View style={{ marginTop: 20, borderColor: colors.line, paddingBottom: 20, gap: 10 }}>
                    <SetText style={{ marginTop: 8 }} type="bold">อัปโหลดแบบที่ต้องการ</SetText>
                    <TouchableOpacity onPress={handleChoosePhoto} style={{ width: 160, height: 224, marginTop: 10, borderRadius: 10, backgroundColor: colors.white, ...styles.shadowCustom, alignItems: 'center', justifyContent: 'center' }}>
                        {photo && <TouchableOpacity onPress={() => setPhoto(null)} style={{ position: 'absolute', top: -10, right: -10, zIndex: 99 }}><Iconify icon="mdi:cross-circle" size={24} color={colors.black} /></TouchableOpacity>}
                        {photo ? <Image source={{ uri: photo }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                            : <Iconify icon="fluent-emoji-high-contrast:plus" size={40} color={colors.line} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity disabled={!(value.length > 0 && photo) || buttonDelay} onPress={handleSaveButton} style={{ borderTopWidth: 0.5, marginTop: 10, position: 'absolute', bottom: 0, height: 80, width: '100%', borderTopStartRadius: 8, borderTopEndRadius: 8, justifyContent: 'center', paddingHorizontal: 20, borderColor: colors.line }}>
                <View style={{ padding: 10, alignItems: 'center', borderRadius: 999, backgroundColor: !(value.length > 0 && photo) || buttonDelay  ? colors.lesspink : colors.mediumpink }}>
                    <SetText type='bold' color={colors.white}>บันทึก</SetText>
                </View>
            </TouchableOpacity>
        </View>
    )
}