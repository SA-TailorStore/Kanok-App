import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors, styles } from "@/utils/styles";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, ScrollView, Alert, TextInput } from "react-native";
import { Iconify } from "react-native-iconify";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { useToast } from "@/contexts/ToastContext";
import Loading from "@/components/Loading";
import { IFabric } from "@/types/IFabric";

export default function Fabric() {
    const navigation = useNavigation();
    const [isEditor, setIsEditor] = useState<boolean>(false);
    const [fabricUpdate, setFabricUpdate] = useState<IFabric[]>([])
    const [isPopupAdd, setIsPopupAdd] = useState<boolean>(false);
    const [fabrics, setFabrics] = useState<IFabric[]>([]);

    const { showToast } = useToast();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
        });
        getFabrics();
    }, [isPopupAdd]);

    const handleButton = async () => {
        // update fabrics
        const PATH = process.env.EXPO_PUBLIC_API_URL + '/api/fabric/updates'

        setIsEditor((prev) => !prev);
        if (isEditor && fabricUpdate.length > 0) {
            await axios.post(PATH, fabricUpdate).then((res) => {
                if (res?.status === 204) {
                    showToast('อัปเดทลายผ้าสำเร็จ', 'คุณอัปเดทลายผ้าสำเร็จแล้ว', 'success');
                }
                setFabricUpdate([]);
            }).catch((err) => {
                showToast('อัปเดทลายผ้าไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้งหรือติดต่อนักพัฒนา', 'error');
            })
        }
    }
    const getFabrics = async () => {
        const PATH = process.env.EXPO_PUBLIC_API_URL + '/api/fabrics';
        await axios.get(PATH).then((res) => {
            if (res.data.data) {
                setFabrics(res.data.data)
            } else {
                setFabrics([]);
            };
        }
        ).catch((err) => {
            console.log(err);
        });
    }

    const createTwoButtonAlert = (id: number) =>
        Alert.alert('แน่ใจหรือไม่ว่าต้องการลบ', 'แน่ใจหรือไม่ว่าต้องการลบลายผ้าที่คุณเลือก', [
            {
                text: 'ยกเลิก',
                onPress: () => console.log('ยกเลิก'),
                style: 'cancel',
            },
            {
                text: 'ลบ', onPress: async () => {
                    await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/fabric/delete', { fabric_id: id }).then((res) => {
                        if (res.status === 204) {
                            getFabrics();
                            showToast('ลบลายผ้าสำเร็จ', 'คุณได้ลบลายผ้าสำเร็จแล้ว', 'success');
                        }
                    }).catch((err) => {
                        showToast('ลบลายผ้าไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้งหรือติดต่อนักพัฒนา', 'error');
                    });
                }
            },
        ]);

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
                                fabrics.length > 0 ?
                                    fabrics.map((item, index) => (
                                        <Swipeable
                                            key={index}
                                            renderRightActions={() => {
                                                return (
                                                    <>
                                                        <TouchableOpacity onPress={() => createTwoButtonAlert(item.fabric_id)} style={{ backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', width: 74, marginRight: 15, borderTopRightRadius: 10, borderBottomRightRadius: 10, marginVertical: 5 }}>
                                                            <SetText color={colors.white} type="bold">ลบ</SetText>
                                                        </TouchableOpacity>
                                                    </>
                                                )
                                            }}
                                        >
                                            <CardItem item={item} isEditor={isEditor} setFabricUpdate={setFabricUpdate} />
                                        </Swipeable>
                                    )) :
                                    <SetText style={{ width: '100%', textAlign: 'center', marginTop: '5%' }} size={16} color={colors.grey}>No Data</SetText>
                            }
                        </ScrollView>
                    </GestureHandlerRootView>
                </View>
            </View>
            {!isEditor && <TouchableOpacity onPress={() => setIsPopupAdd(true)} style={{ position: 'absolute', width: 70, height: 70, bottom: 0, right: 0, margin: 15, borderRadius: 999, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...styles.shadowCustom }}>
                <Iconify icon='fluent-emoji-high-contrast:plus' size={40} color={colors.mediumpink} />
            </TouchableOpacity>}
            {isPopupAdd && <Popup action="add" setIsShow={setIsPopupAdd} />}
        </WrapBackground>
    );
}

const CardItem = ({ item, isEditor, setFabricUpdate }: { item: any, isEditor: boolean, setFabricUpdate: React.Dispatch<React.SetStateAction<IFabric[]>> }) => {
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
            setFabricUpdate((prev: IFabric[]) => {
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
            <View style={{ width: 90, height: 90, borderRadius: 10, alignItems: 'center', justifyContent: 'center', ...styles.shadowCustom }}>
                <Image source={{ uri: item.fabric_url }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
            </View>
            <View style={{ flexDirection: 'column', width: '70%', marginTop: 5 }}>
                <SetText type="bold" size={16}>รหัสลายผ้า : {item.fabric_id}</SetText>
                <SetText type="bold" size={16}>จำนวนคงเหลือ : {quantity}</SetText>
                {isEditor && <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                    <TouchableOpacity disabled={quantity === 0} style={quantity === 0 ? { opacity: 0.3 } : undefined} onPress={decreaseQuantity} onLongPress={decreaseQuantity10}>
                        <Iconify icon="simple-line-icons:minus" size={24} color={colors.whereblack} />
                    </TouchableOpacity>
                    <TextInput
                        keyboardType="number-pad"
                        value={quantity.toString()}
                        onChange={(e) => parseInt(e.nativeEvent.text) > 0 ? setQuantity(parseInt(e.nativeEvent.text)) : setQuantity(0)}
                        style={{ borderWidth: 0.5, borderColor: colors.line, borderRadius: 10, height: 30, width: 70, textAlign: 'center', fontFamily: 'notoSansThai' }}
                    />
                    <TouchableOpacity onPress={increaseQuantity} onLongPress={increaseQuantity10}>
                        <Iconify icon="simple-line-icons:plus" size={24} color={colors.whereblack} />
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    )
}


const Popup = ({ action, fabric_id, setIsShow }: { action: 'add' | 'edit', fabric_id?: number, setIsShow: (value: boolean) => void }) => {
    const [photo, setPhoto] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [buttonDelay, setButtonDelay] = useState<boolean>(false);
    const { showToast } = useToast();

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            allowsEditing: true,
            quality: 0.5
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    }

    const handleShotPhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            allowsEditing: true,
            quality: 0.5
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    }

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

    const uploadtoServer = async (url: string) => {
        const PATH = process.env.EXPO_PUBLIC_API_URL + '/api/fabric/add';

        let formData = new FormData() as any;
        formData.append('quantity', quantity);
        formData.append('image', {
            uri: url,
            type: 'image/jpeg',
            name: 'fabric.jpg'
        });

        await axios.post(PATH, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.status === 201) {
                showToast('เพิ่มลายผ้าสำเร็จ', 'คุณได้เพิ่มลายผ้าสำเร็จแล้ว', 'success');
                setIsShow(false);
            } else if (res.status === 204) {
                showToast('แก้ไขลายผ้าสำเร็จ', 'คุณได้แก้ไขลายผ้าสำเร็จแล้ว', 'success');
                setIsShow(false);
            }
            setButtonDelay(false);
        }
        ).catch((err) => {

            showToast('เพิ่มหรือแก้ไขไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้งหรือติดต่อนักพัฒนา', 'error');
            setButtonDelay(false);
        });

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
            <Loading visible={buttonDelay} />
            <View style={{ backgroundColor: colors.backgroundColor, width: '100%', height: '65%', position: 'absolute', bottom: 0, alignSelf: 'center', borderRadius: 16, padding: 20 }}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SetText type="bold" size={20}>{action === 'add' ? 'เพิ่มแบบ' : 'แก้ไขแบบ'}</SetText>
                            <TouchableOpacity onPress={() => setIsShow(false)}><Iconify icon="bx:bx-x" size={24} color={colors.grey} /></TouchableOpacity>
                        </View>
                        <View style={{ borderColor: colors.line, paddingBottom: 20, gap: 10 }}>
                            <SetText style={{ marginTop: 8 }} type="bold">อัปโหลดลายผ้าที่ต้องการ</SetText>
                            <TouchableOpacity onPress={handleChoosePhoto} style={{ width: 160, height: 160, marginTop: 10, borderRadius: 10, backgroundColor: colors.white, ...styles.shadowCustom, alignItems: 'center', justifyContent: 'center' }}>
                                {photo && <TouchableOpacity onPress={() => setPhoto(null)} style={{ position: 'absolute', top: -10, right: -10, zIndex: 99 }}><Iconify icon="mdi:cross-circle" size={24} color={colors.black} /></TouchableOpacity>}
                                {photo ? <Image source={{ uri: photo }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                    : <Iconify icon="fluent-emoji-high-contrast:plus" size={40} color={colors.line} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleShotPhoto} style={{ width: 160, marginTop: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Iconify icon="fluent-emoji-high-contrast:camera" size={24} color={colors.whereblack} />
                                <SetText>ถ่ายภาพ</SetText>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 20, borderColor: colors.line }}>
                            <SetText type='bold' color={colors.whereblack} size={16}>จำนวน</SetText>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <TouchableOpacity disabled={quantity === 0} style={quantity === 0 ? { opacity: 0.3 } : undefined} onPress={decreaseQuantity} onLongPress={decreaseQuantity10}>
                                    <Iconify icon="simple-line-icons:minus" size={24} color={colors.whereblack} />
                                </TouchableOpacity>
                                <TextInput
                                    keyboardType="number-pad"
                                    value={quantity.toString()}
                                    onChange={(e) => parseInt(e.nativeEvent.text) > 0 ? setQuantity(parseInt(e.nativeEvent.text)) : setQuantity(0)}
                                    style={{ borderWidth: 0.5, borderColor: colors.line, borderRadius: 10, height: 40, width: 100, textAlign: 'center', fontFamily: 'notoSansThai', padding: 8 }}
                                />
                                <TouchableOpacity onPress={increaseQuantity} onLongPress={increaseQuantity10}>
                                    <Iconify icon="simple-line-icons:plus" size={24} color={colors.whereblack} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </GestureHandlerRootView>
            </View>
            <View style={{ borderTopWidth: 0.5, marginTop: 10, position: 'absolute', bottom: 0, height: 80, width: '100%', borderTopStartRadius: 8, borderTopEndRadius: 8, justifyContent: 'center', paddingHorizontal: 20, borderColor: colors.line, backgroundColor: colors.backgroundColor }}>
                <TouchableOpacity onPress={handleSaveButton} disabled={photo ? false : true} style={{ padding: 10, alignItems: 'center', borderRadius: 999, backgroundColor: photo ? colors.mediumpink : colors.lesspink }}>
                    <SetText type='bold' color={colors.white}>บันทึก</SetText>
                </TouchableOpacity>
            </View>
        </View>
    )
}