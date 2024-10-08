import { FormInput } from "@/components/FormInput";
import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors } from "@/utils/styles";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, Swipeable, ScrollView } from "react-native-gesture-handler";
import { Iconify } from "react-native-iconify";

const material = [
    {
        id: '0',
        name: 'ผ้าปูที่นอน',
        amount: 1,
    },
    {
        id: '1',
        name: 'ผ้าปูที่นอน2',
        amount: 10,
    },
    {
        id: '2',
        name: 'ผ้าปูที่นอน3',
        amount: 7,
    },
    {
        id: '3',
        name: 'ผ้าปูที่นอน4',
        amount: 8,
    },
    {
        id: '0',
        name: 'ผ้าปูที่นอน',
        amount: 1,
    },
    {
        id: '1',
        name: 'ผ้าปูที่นอน2',
        amount: 10,
    },
    {
        id: '2',
        name: 'ผ้าปูที่นอน3',
        amount: 7,
    },
    {
        id: '3',
        name: 'ผ้าปูที่นอน4',
        amount: 8,
    },
    {
        id: '0',
        name: 'ผ้าปูที่นอน',
        amount: 1,
    },
    {
        id: '1',
        name: 'ผ้าปูที่นอน2',
        amount: 10,
    },
    {
        id: '2',
        name: 'ผ้าปูที่นอน3',
        amount: 7,
    },
    {
        id: '3',
        name: 'ผ้าปูที่นอน4',
        amount: 8,
    },
    {
        id: '0',
        name: 'ผ้าปูที่นอน',
        amount: 1,
    },
    {
        id: '1',
        name: 'ผ้าปูที่นอน2',
        amount: 10,
    },
    {
        id: '2',
        name: 'ผ้าปูที่นอน3',
        amount: 7,
    },
    {
        id: '3',
        name: 'ผ้าปูที่นอน4',
        amount: 8,
    },
    {
        id: '0',
        name: 'ผ้าปูที่นอน',
        amount: 1,
    },
    {
        id: '1',
        name: 'ผ้าปูที่นอน2',
        amount: 10,
    },
    {
        id: '2',
        name: 'ผ้าปูที่นอน3',
        amount: 7,
    },
    {
        id: '3',
        name: 'ผ้าปูที่นอน4',
        amount: 8,
    },
    {
        id: '0',
        name: 'ผ้าปูที่นอน',
        amount: 1,
    },
    {
        id: '1',
        name: 'ผ้าปูที่นอน2',
        amount: 10,
    },
    {
        id: '2',
        name: 'ผ้าปูที่นอน3',
        amount: 7,
    },
    {
        id: '3',
        name: 'ผ้าปูที่นอน4',
        amount: 8,
    },
    {
        id: '8',
        name: 'ผ้าปูที่นอน9',
        amount: 8,
    }
]

const createTwoButtonAlert = () =>
    Alert.alert('แน่ใจหรือไม่ว่าต้องการลบ', 'แน่ใจหรือไม่ว่าต้องการลบวัสดุที่คุณเลือก', [
        {
            text: 'ยกเลิก',
            onPress: () => console.log('ยกเลิก'),
            style: 'cancel',
        },
        {
            text: 'ลบ', onPress: () => console.log('ลบ')
        },
    ]);

export default function Material() {
    const navigation = useNavigation();
    const [isPopupAdd, setIsPopupAdd] = useState<boolean>(false);
    const [isPopupEdit, setIsPopupEdit] = useState<boolean>(false);
    const [material_id, setMaterialId] = useState<string | null>(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "",
        });
    }, [])

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ flex: 1, flexDirection: 'column', gap: 15 }}>
                <View style={{ paddingTop: '15%', paddingHorizontal: 20, flexDirection: 'row', gap: 10 }}>
                    <View style={{ width: '100%', flex: 1 }}>
                        <SearchItem />
                    </View>
                    <TouchableOpacity onPress={() => setIsPopupAdd(true)} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}><SetText type="bold" color={colors.mediumpink}>เพิ่มวัสดุ</SetText></TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.grey, paddingHorizontal: 20 }}>
                        <SetText type="bold">ชื่อวัสดุ</SetText>
                        <SetText type="bold">จำนวน</SetText>
                        <SetText type="bold"></SetText>
                    </View>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <ScrollView>
                            {
                                material.map((item, index) => (
                                    <Swipeable
                                        key={index}
                                        renderRightActions={() => {
                                            return (
                                                <>
                                                    <TouchableOpacity onPress={createTwoButtonAlert} style={{ backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', width: 100 }}>
                                                        <SetText color={colors.white} size={10}>ลบ</SetText>
                                                    </TouchableOpacity>
                                                </>
                                            )
                                        }}
                                    >
                                        <TouchableOpacity onPress={() => {
                                            setMaterialId(item.id);
                                            setIsPopupEdit(true);
                                        }} key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.line, paddingHorizontal: 20, height: 60, backgroundColor: colors.wherewhite }}>
                                            <SetText>{item.name}</SetText>
                                            <SetText>{item.amount}</SetText>
                                            <Iconify icon="weui:back-filled" size={16} color={colors.grey} style={[{ transform: [{ rotate: '180deg' }] }]} />
                                        </TouchableOpacity>
                                    </Swipeable>
                                ))
                            }
                        </ScrollView>
                    </GestureHandlerRootView>
                </View>
            </View>
            {isPopupAdd && <Popup action="add" setIsShow={setIsPopupAdd} />}
            {isPopupEdit && <Popup action="edit" material_id={material_id!} setIsShow={setIsPopupEdit} />}

        </WrapBackground>
    )
}

const SearchItem = () => {
    return (
        <FormInput iconHeader={<Iconify icon="mingcute:search-line" size={24} color={colors.grey} />} placeholder="ค้นหา" />
    )
}

const Popup = ({ action, material_id, setIsShow }: { action: 'add' | 'edit', material_id?: string, setIsShow: (value: boolean) => void }) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [name, setName] = useState<string>('');

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
    return (
        <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: colors.backgroundColor, width: '100%', height: '36%', position: 'absolute', bottom: 0, alignSelf: 'center', borderRadius: 16, padding: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SetText type="bold" size={20}>{action === 'add' ? 'เพิ่มวัสดุ' : 'แก้ไขวัสดุ'}</SetText>
                    <TouchableOpacity onPress={() => setIsShow(false)}><Iconify icon="bx:bx-x" size={24} color={colors.grey} /></TouchableOpacity>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: colors.line, marginBottom: 20, paddingBottom: 20 }}>
                    <SetText style={{ marginTop: 8 }}>กรอกชื่อและจำนวนของวัสดุ</SetText>
                    <TextInput
                        multiline
                        placeholder="ชื่อวัสดุ"
                        onChange={(e) => setName(e.nativeEvent.text)}
                        value={name}
                        style={{ marginTop: 10, borderWidth: 0.5, borderColor: colors.line, borderRadius: 10, height: 60, fontFamily: 'notoSansThai', textAlignVertical: 'top', padding: 8 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <SetText type='bold' color={colors.whereblack} size={16}>จำนวน</SetText>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <TouchableOpacity disabled={quantity === 0} style={quantity === 0 ? { opacity: 0.3 } : undefined} onPress={decreaseQuantity} onLongPress={decreaseQuantity10}>
                            <Iconify icon="simple-line-icons:minus" size={24} color={colors.whereblack} />
                        </TouchableOpacity>
                        <SetText size={16} type="bold" style={{}}>{quantity}</SetText>
                        <TouchableOpacity onPress={increaseQuantity} onLongPress={increaseQuantity10}>
                            <Iconify icon="simple-line-icons:plus" size={24} color={colors.whereblack} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity disabled={!(name.length > 0)} style={{ borderTopWidth: 0.5, marginTop: 10, position: 'absolute', bottom: 0, height: 80, width: '100%', borderTopStartRadius: 8, borderTopEndRadius: 8, justifyContent: 'center', paddingHorizontal: 20, borderColor: colors.line }}>
                <View style={{ padding: 10, alignItems: 'center', borderRadius: 999, backgroundColor: name.length > 0 ? colors.mediumpink : colors.lesspink }}>
                    <SetText type='bold' color={colors.white}>บันทึก</SetText>
                </View>
            </TouchableOpacity>
        </View>
    )
}