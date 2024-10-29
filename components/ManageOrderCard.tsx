import { colors, styles } from "@/utils/styles";
import { Alert, TouchableOpacity, View, Image, TextInput } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SetText } from "./SetText";
import { Iconify } from "react-native-iconify";
import { useEffect, useState } from "react";
import { ProductRequest } from "@/types/ProductRequest";
import { IDesign } from "@/types/IDesign";
import axios from "axios";
import { useSession } from "@/contexts/SessionContext";
import { IProduct } from "@/types/IProduct";
import { useRouter } from "expo-router";

export default function ManageOrderCard({ item, id }: { item: ProductRequest, id: number }) {
    const [quantity, setQuantity] = useState<number>(item.total_quantity);
    const router = useRouter();

    const [design, setDesign] = useState<IDesign>();
    const [remaining, setRemaining] = useState<number>(0);
    const { setProductContext } = useSession();

    const onDeleteButton = () => {
        setProductContext((prev: IProduct[]) => {
            prev.splice(id, 1);
            return prev;
        })
        router.replace('/user-stack/manage-design');
    }

    const onDuplicateButton = () => {
        setProductContext((prev: IProduct[]) => {
            const newProduct = {
                ...prev[id],
                total_quantity: quantity
            }
            prev.push(newProduct);
            return prev;
        })
        router.replace('/user-stack/manage-design');
    }

    const increaseQuantity = () => {
        setQuantity((q) => {
            if (q + 1 > remaining) return remaining;
            return q + 1;
        });
    }

    const increaseQuantity10 = () => {
        setQuantity((q) => {
            if (q + 10 > remaining) return remaining;
            return q + 10;
        });
    }

    const decreaseQuantity = () => {
        setQuantity((q) => {
            if (q - 1 < 1) return 1;
            return q - 1;
        });
    }

    const decreaseQuantity10 = () => {
        setQuantity((q) => {
            if (q - 10 < 1) return 1;
            return q - 10;
        });
    }

    const fetchDesign = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/design/get', {
            design_id: item.design_id
        }).then((res) => {
            if (res.status === 200) {
                setDesign(res.data.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const fetchFabric = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/fabric/get', {
            fabric_id: item.fabric_id
        }).then((res) => {
            if (res.status === 200) {
                setRemaining(res.data.data.quantity);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchDesign();
        fetchFabric();
    }, [])

    useEffect(() => {
        setProductContext((prev: IProduct[]) => {
            const newProduct = {
                ...prev[id],
                total_quantity: quantity
            }
            prev[id] = newProduct;
            return prev;

        })
    }, [quantity])

    return (
        <>
            <Swipeable
                containerStyle={{ ...styles.shadowCustom, backgroundColor: colors.white, borderRadius: 16 }}
                renderRightActions={() => {
                    return (
                        <>
                            <TouchableOpacity onPress={onDeleteButton} style={{ backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', width: 50 }}>
                                <SetText color={colors.white} size={10}>ลบ</SetText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDuplicateButton} style={{ backgroundColor: colors.whereblack, alignItems: 'center', justifyContent: 'center', width: 50 }}>
                                <SetText color={colors.white} size={10}>ทำสำเนา</SetText>
                            </TouchableOpacity>
                        </>
                    )
                }}
            >
                <View style={{ backgroundColor: colors.white, height: 180, borderRadius: 16, padding: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText type="bold" size={16}>รหัสสินค้า : {item.design_id}</SetText>
                        {remaining === 0 && <SetText color={colors.red}>สินค้าหมด</SetText>}
                        {remaining < quantity && remaining !== 0 && <SetText color={colors.red}>สินค้ามีไม่เพียงพอ</SetText>}
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5, gap: 10 }}>
                        <View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 8, ...styles.shadowCustom }}>
                            {design && <Image source={{ uri: design?.design_url }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />}
                            <View style={{ position: 'absolute', bottom: 0, backgroundColor: colors.whereblack, opacity: 0.8, width: '100%', alignItems: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                <SetText color={colors.white}>{remaining > 0 ? `เหลือ ${remaining} ชิ้น` : 'สิ้นค้านี้หมด'}</SetText>
                            </View>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', height: 130 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignSelf: 'flex-start', borderWidth: 0.5, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: colors.backgroundColor, borderColor: colors.grey, borderRadius: 5 }}>
                                    <SetText color={colors.black}>
                                        ลาย {item.fabric_id}, ไซส์ {item.size}
                                    </SetText>
                                    <Iconify style={{ transform: [{ rotate: '-90deg' }] }} icon='weui:back-filled' size={15} color={colors.whereblack} />
                                </TouchableOpacity>
                                <SetText>ประเภท : {item.design_id}</SetText>
                                <SetText>คำอธิบาย : {item.detail.length > 20 ? item.detail.substring(0, 20) + '...' : item.detail}</SetText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, right: 0 }}>
                                <SetText type='bold' color={colors.mediumpink} size={16}></SetText>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <TouchableOpacity disabled={quantity === 1} style={quantity === 1 ? { opacity: 0.3 } : undefined} onPress={decreaseQuantity} onLongPress={decreaseQuantity10}>
                                        <Iconify icon="simple-line-icons:minus" size={24} color={colors.whereblack} />
                                    </TouchableOpacity>
                                    <TextInput
                                        keyboardType="number-pad"
                                        value={quantity.toString()}
                                        onChange={(e) => parseInt(e.nativeEvent.text) > 0 ? parseInt(e.nativeEvent.text) > remaining ? setQuantity(remaining) : setQuantity(parseInt(e.nativeEvent.text)) : setQuantity(0)}
                                        style={{ borderWidth: 0.5, borderColor: colors.line, borderRadius: 10, height: 40, width: 100, textAlign: 'center', fontFamily: 'notoSansThai', padding: 8 }}
                                    />
                                    <TouchableOpacity disabled={quantity === remaining} style={quantity === remaining ? { opacity: 0.3 } : undefined} onPress={increaseQuantity} onLongPress={increaseQuantity10}>
                                        <Iconify icon="simple-line-icons:plus" size={24} color={colors.whereblack} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Swipeable>
        </>
    )
}