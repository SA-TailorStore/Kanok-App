import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useSession } from "@/contexts/SessionContext";
import { useToast } from "@/contexts/ToastContext";
import { IFabric } from "@/types/IFabric";
import { colors, styles } from "@/utils/styles";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image, ScrollView, ImageSourcePropType, TouchableOpacity, FlatList, Dimensions, TextInput, NativeSyntheticEvent, NativeScrollEvent, Animated, PanResponder } from "react-native";
import { Iconify } from "react-native-iconify";

export const fabricList: IFabric[] = [
    {
        fabric_id: 0,
        image: require('@/assets/images/fabric/0.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 1,
        image: require('@/assets/images/fabric/1.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 2,
        image: require('@/assets/images/fabric/2.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 3,
        image: require('@/assets/images/fabric/0.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 4,
        image: require('@/assets/images/fabric/1.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 5,
        image: require('@/assets/images/fabric/2.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 6,
        image: require('@/assets/images/fabric/0.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 7,
        image: require('@/assets/images/fabric/1.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 8,
        image: require('@/assets/images/fabric/2.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 9,
        image: require('@/assets/images/fabric/0.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 10,
        image: require('@/assets/images/fabric/1.jpg'),
        quantity: 100,
    },
    {
        fabric_id: 11,
        image: require('@/assets/images/fabric/2.jpg'),
        quantity: 100,
    },

]

export const sizeList = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
    const [fabric, setFabric] = useState<number | null>(null);
    const [size, setSize] = useState<string | null>(null);
    const [detail, setDetail] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    const [isReady, setIsReady] = useState<boolean>(false);

    const route = useRoute() as { params: { design_id: string } };
    const router = useRouter();
    const navigation = useNavigation();
    const { design_id } = route.params;

    const { showToast } = useToast();
    const { updateProduct } = useSession();

    useEffect(() => {
        console.log(design_id)
        navigation.setOptions({
            headerTitle: "",
        });
    }, [])

    useEffect(() => {
        if (fabric !== null && size !== null) {
            setIsReady(true);
        }
    })

    const { width } = Dimensions.get('window');

    const increaseQuantity = () => {
        setQuantity((q) => q + 1);
    }

    const increaseQuantity10 = () => {
        setQuantity((q) => q + 10);
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

    const onButtonSubmit = () => {
        console.log(fabric, size, detail, quantity);

        updateProduct({
            design_id: design_id, 
            fabric_id: fabric?.toString(), 
            size: size, 
            detail: detail, 
            total_quantity: quantity});
        showToast('บันทึกแบบเรียบร้อยแล้ว', 'แบบที่คุณแก้ไขได้ถูกบันทึกเรียบร้อยแล้ว', 'success');
        router.dismissAll();
        router.replace('/user-stack/manage-design');
    }

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '60%', marginBottom: '-15%' }}>
                <FlatList data={fabricList} keyExtractor={(_, index: number) => index.toString()} renderItem={({ item, index }: { item: IFabric, index: number }) => {
                    return <Image key={index} source={item.image} style={{ width: width, height: '100%' }} />
                }
                } horizontal showsHorizontalScrollIndicator={false} pagingEnabled />
            </View>
            <View style={{ width: '100%', height: '60%', borderTopLeftRadius: 51, borderTopRightRadius: 51, backgroundColor: colors.backgroundColor, marginTop: 1, ...styles.shadowCustom3, paddingBottom: 100 }}>
                <View
                    onMoveShouldSetResponder={() => true}
                    onPointerMove={(e) => console.log(e.nativeEvent)}
                    // onResponderMove={(e) => console.log(e.nativeEvent)}
                    style={{ width: '15%', alignSelf: 'center', height: 5, borderRadius: 999, marginTop: '2%', backgroundColor: colors.grey, marginBottom: '2%' }}
                />
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: '8%', paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginTop: '5%' }}>
                        <SetText size={24} type="bold">กรอกรายละเอียดเสื้อผ้า</SetText>
                    </View>

                    {/* Section 1 เลือกลายผ้า */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <SetText size={16} type="bold">ลายผ้า</SetText>
                            <SetText color={colors.grey} size={14} type="small">คลัง : 999</SetText>
                        </View>
                        <SetText color={colors.grey} size={14} type="small">(1ผืน/1ตัว)</SetText>
                    </View>
                    <View style={{ paddingVertical: 12, borderColor: colors.line }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 15 }}>
                            {fabricList.map((item: IFabric, index: number) => {
                                return (
                                    <TouchableOpacity onPress={() => setFabric(item.fabric_id)} key={index} style={{ position: 'relative', height: 48, width: 48, alignItems: 'center', justifyContent: 'center', padding: 2, borderWidth: 1, borderRadius: 999, overflow: "hidden" }}>
                                        <Image source={item.image} style={{ width: 100, height: 100, borderRadius: 999 }} />
                                        <Iconify icon="material-symbols:check" color={fabric === item.fabric_id ? colors.black : 'transparent'} size={24} style={{ position: 'absolute', height: "50%", width: "50%" }} />
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>

                    {/* Section 2 เลือกไซต์ */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <SetText size={16} type="bold">ไซต์</SetText>
                            <Iconify icon="bx:bx-info-circle" size={24} color={colors.grey} />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.line }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 10 }}>
                            {sizeList.map((item, index: number) => {
                                const selected = size === item;
                                return (
                                    <TouchableOpacity onPress={() => setSize(item)} key={index} style={{ height: 41, width: 54, alignItems: 'center', justifyContent: 'center', padding: 2, borderWidth: 1, borderRadius: 12, borderColor: selected ? colors.mediumpink : colors.grey }}>
                                        <SetText size={16} color={selected ? colors.mediumpink : colors.whereblack}>{item}</SetText>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>

                    {/* Section 3 เขียนรายละเอียดเพิ่มเติม */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <SetText size={16} type="bold">รายละเอียดเพิ่มเติม</SetText>
                            <SetText size={14} color={colors.grey} type="small">(Optional)</SetText>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 12, borderColor: colors.line }}>
                        <TextInput
                            multiline
                            style={{ height: 150, textAlignVertical: 'top', width: '100%', padding: 10, borderWidth: 1, borderRadius: 12, borderColor: colors.grey, fontFamily: 'notoSansThai' }}
                            placeholder="รายละเอียดเพิ่มเติม"
                            onChange={(e) => setDetail(e.nativeEvent.text)}
                            value={detail||''}
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={{
                width: '100%', height: 90, position: 'absolute', bottom: 0, backgroundColor: colors.white, borderTopWidth: 5, borderTopColor: 'rgba(0, 0, 0, 0.05)', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: '8%'
            }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <TouchableOpacity disabled={quantity === 1} style={quantity === 1 ? { opacity: 0.3 } : undefined} onPress={decreaseQuantity} onLongPress={decreaseQuantity10}>
                        <Iconify icon="simple-line-icons:minus" size={24} color={colors.whereblack} />
                    </TouchableOpacity>
                    <SetText size={16} type="bold" style={{}}>{quantity}</SetText>
                    <TouchableOpacity onPress={increaseQuantity} onLongPress={increaseQuantity10}>
                        <Iconify icon="simple-line-icons:plus" size={24} color={colors.whereblack} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity disabled={!isReady} onPress={onButtonSubmit} style={[{ backgroundColor: isReady? colors.mediumpink : colors.grey, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white}>เพิ่มลงตะกร้า</SetText>
                </TouchableOpacity>
            </View>
        </WrapBackground>
    );
}

