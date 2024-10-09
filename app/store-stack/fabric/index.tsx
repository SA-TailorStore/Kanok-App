import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, styles } from "@/utils/styles";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Alert } from "react-native";
import { Iconify } from "react-native-iconify";
import { Dropdown } from 'react-native-element-dropdown';
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

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


const fakeData: FabricType[] = [
    {
        fabric_id: 0,
        fabric_url: 'xxxx',
        quantity: 12
    },
    {
        fabric_id: 1,
        fabric_url: 'xxxx',
        quantity: 12
    },
    {
        fabric_id: 2,
        fabric_url: 'xxxx',
        quantity: 52
    },
    {
        fabric_id: 3,
        fabric_url: 'xxxx',
        quantity: 16
    },
    {
        fabric_id: 4,
        fabric_url: 'xxxx',
        quantity: 2
    },
    {
        fabric_id: 5,
        fabric_url: 'xxxx',
        quantity: 12
    },
    {
        fabric_id: 6,
        fabric_url: 'xxxx',
        quantity: 16
    },
    {
        fabric_id: 7,
        fabric_url: 'xxxx',
        quantity: 2
    },
    {
        fabric_id: 8,
        fabric_url: 'xxxx',
        quantity: 12
    },
]

type FabricType = {
    fabric_id: number;
    fabric_url?: string;
    quantity: number;
}

export default function Fabric() {
    const navigation = useNavigation();
    const [isEditor, setIsEditor] = useState<boolean>(false);
    const [fabricUpdate, setFabricUpdate] = useState<FabricType[]>([])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
        });
    }, []);

    useEffect(() => {
        console.log(fabricUpdate);
    }, [fabricUpdate]);

    const handleButton = () => {
        setIsEditor((prev) => !prev);
        if (isEditor) {
            console.log(fabricUpdate);
        }
    }

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ flex: 1, flexDirection: 'column', gap: 15 }}>
                <View style={{ paddingTop: '15%', paddingHorizontal: 20, flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                    <SetText size={24} type="bold">ลายผ้าในสต็อก</SetText>
                    <TouchableOpacity onPress={() => handleButton()} style={{ alignItems: 'center', justifyContent: 'center' }}><SetText type="bold" size={18} color={colors.mediumpink}>{isEditor ? "บันทึก" : "แก้ไข"}</SetText></TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: '100%' }}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
                            {
                                fakeData.map((item, index) => (
                                    <Swipeable
                                        key={index}
                                        renderRightActions={() => {
                                            return (
                                                <>
                                                    <TouchableOpacity onPress={createTwoButtonAlert} style={{ backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', width: 74, marginRight: 15, borderTopRightRadius: 10, borderBottomRightRadius: 10, marginVertical: 5 }}>
                                                        <SetText color={colors.white} type="bold">ลบ</SetText>
                                                    </TouchableOpacity>
                                                </>
                                            )
                                        }}
                                    >
                                        <CardItem item={item} isEditor={isEditor} setFabricUpdate={setFabricUpdate} />
                                    </Swipeable>
                                ))
                            }
                        </ScrollView>
                    </GestureHandlerRootView>
                </View>
            </View>
            {!isEditor && <TouchableOpacity onPress={() => console.log('tete')} style={{ position: 'absolute', width: 70, height: 70, bottom: 0, right: 0, margin: 15, borderRadius: 999, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...styles.shadowCustom }}>
                <Iconify icon='fluent-emoji-high-contrast:plus' size={40} color={colors.mediumpink} />
            </TouchableOpacity>}
            {/* {isPopupAdd && <Popup action="add" setIsShow={setIsPopupAdd} />}
            {isPopupEdit && <Popup action="edit" design_id={designId} setIsShow={setIsPopupEdit} />} */}
        </WrapBackground>
    );
}

const CardItem = ({ item, isEditor, setFabricUpdate }: { item: any, isEditor: boolean, setFabricUpdate: React.Dispatch<React.SetStateAction<FabricType[]>>}) => {
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const [loading, setLoading] = useState<boolean>(true);

    const increaseQuantity = () => {
        setQuantity((q) => q + 1);
    }

    const increaseQuantity10 = () => {
        setQuantity((q) => q + 10);
    }

    const decreaseQuantity = () => {
        setQuantity((q) => {
            if (q - 1 < 0) return 0;
            return q - 1;
        });
    }

    const decreaseQuantity10 = () => {
        setQuantity((q) => {
            if (q - 10 < 0) return 0;
            return q - 10;
        });
    }

    useEffect(() => {
        if (!loading) {
            setFabricUpdate((prev: FabricType[]) => {
                console.log(prev);
                const index = prev.findIndex((fabric) => fabric.fabric_id === item.fabric_id);
                if (index === -1) return [...prev, { fabric_id: item.fabric_id, quantity: quantity }];
                prev[index].quantity = quantity;
                return prev;
            });
        }
        setLoading(false);
    }, [quantity]);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomColor: colors.line, paddingHorizontal: 10, height: 'auto', backgroundColor: colors.white, borderRadius: 8, ...styles.shadowCustom, marginHorizontal: 15, marginVertical: 5 }}>
            <View style={{ width: 90, height: 90, borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <SetText type="bold" size={16}>รูป no.{item.fabric_id}</SetText>
            </View>
            <View style={{ flexDirection: 'column', width: '70%', marginTop: 5 }}>
                <SetText type="bold" size={16}>รหัสลายผ้า : {item.fabric_id}</SetText>
                <SetText type="bold" size={16}>จำนวนคงเหลือ : {quantity}</SetText>
                {isEditor && <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                    <TouchableOpacity disabled={quantity === 0} style={quantity === 0 ? { opacity: 0.3 } : undefined} onPress={decreaseQuantity} onLongPress={decreaseQuantity10}>
                        <Iconify icon="simple-line-icons:minus" size={24} color={colors.whereblack} />
                    </TouchableOpacity>
                    <SetText size={16} type="bold" style={{}}>{quantity}</SetText>
                    <TouchableOpacity onPress={increaseQuantity} onLongPress={increaseQuantity10}>
                        <Iconify icon="simple-line-icons:plus" size={24} color={colors.whereblack} />
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    )
}


const Popup = ({ action, design_id, setIsShow }: { action: 'add' | 'edit', design_id?: number, setIsShow: (value: boolean) => void }) => {
    const [value, setValue] = useState<any>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [photo, setPhoto] = useState<any>(null);

    const handleChoosePhoto = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (!response.didCancel) {
                setPhoto(response);
            }
        });
    }

    return (
        <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: colors.backgroundColor, width: '100%', height: '65%', position: 'absolute', bottom: 0, alignSelf: 'center', borderRadius: 16, padding: 20 }}>
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
                    {/* <TouchableOpacity style={{ width: 160, height: 224, borderRadius: 8, ...styles.shadowCustom, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
                        <Iconify icon="bx:bx-image-add" size={40} color={colors.grey} />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={handleChoosePhoto} style={{ width: 160, height: 224, marginTop: 10, borderRadius: 10, backgroundColor: colors.white, ...styles.shadowCustom, alignItems: 'center', justifyContent: 'center' }}>
                        {photo && <TouchableOpacity onPress={() => setPhoto(null)} style={{ position: 'absolute', top: -10, right: -10, zIndex: 99 }}><Iconify icon="mdi:cross-circle" size={24} color={colors.black} /></TouchableOpacity>}
                        {photo ? <Image source={{ uri: photo.assets[0].uri }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                            : <Iconify icon="fluent-emoji-high-contrast:plus" size={40} color={colors.line} />
                        }
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
            <TouchableOpacity disabled={!(value > 0)} style={{ borderTopWidth: 0.5, marginTop: 10, position: 'absolute', bottom: 0, height: 80, width: '100%', borderTopStartRadius: 8, borderTopEndRadius: 8, justifyContent: 'center', paddingHorizontal: 20, borderColor: colors.line }}>
                <View style={{ padding: 10, alignItems: 'center', borderRadius: 999, backgroundColor: value > 0 ? colors.mediumpink : colors.lesspink }}>
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