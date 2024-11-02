import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { useSession } from "@/contexts/SessionContext";
import { useToast } from "@/contexts/ToastContext";
import { IDesign } from "@/types/IDesign";
import { IFabric } from "@/types/IFabric";
import { colors, styles } from "@/utils/styles";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Image, ScrollView, TouchableOpacity, FlatList, Dimensions, TextInput, Animated, } from "react-native";
import { Iconify } from "react-native-iconify";

export const sizeList = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
    const [fabric, setFabric] = useState<number | null>(null);
    const [size, setSize] = useState<string | null>(null);
    const [detail, setDetail] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [fabrics, setFabrics] = useState<IFabric[]>([]);
    const [design, setDesign] = useState<IDesign>();

    const [isReady, setIsReady] = useState<boolean>(false);

    const route = useRoute() as { params: { design_id: string } };
    const { design_id } = route.params;
    const router = useRouter();
    const navigation = useNavigation();
    const [total_quantity, setTotal_quantity] = useState<number>(1);

    const { showToast } = useToast();
    const { updateProduct } = useSession();
    const { width } = Dimensions.get('window');
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setActiveIndex(index);
    };


    useEffect(() => {
        console.log(design_id)
        navigation.setOptions({
            headerTitle: "",
        });
        fetchFabrics();
        fetchDesign();
    }, [])

    useEffect(() => {
        setTotal_quantity(fabrics.find((f: IFabric) => f.fabric_id === fabric)?.quantity || 1);
        if (fabric !== null && size !== null && fabrics.find((f: IFabric) => f.fabric_id === fabric)?.quantity && quantity > 0) {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    }, [fabric, size, quantity])

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
            design_id: parseInt(design_id),
            fabric_id: fabric,
            size: size,
            detail: detail,
            total_quantity: quantity
        });
        showToast('เพิ่มแบบเรียบร้อยแล้ว', 'แบบที่คุณเพิ่มได้เข้าสู่รายการแบบของคุณ', 'success');
        router.dismissAll();
        router.replace('/user-stack/manage-design');
    }

    const fetchFabrics = async () => {
        await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/fabrics').then((res) => {
            if (res.status === 200) {
                setFabrics(res.data.data);
                setFabric(1);
                // console.log(res.data.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const fetchDesign = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/design/get', {
            design_id: Number(design_id)
        }).then((res) => {
            if (res.status === 200) {
                setDesign(res.data.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    if (!design) return null;
    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '60%', marginBottom: '-15%' }}>
                <FlatList
                    data={fabrics}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={
                        <Image
                            source={{ uri: design?.design_url }}
                            style={{ width: width, height: '100%' }}
                        />
                    }
                    renderItem={({ item, index }) => (
                        <Image
                            key={index}
                            source={{ uri: item.fabric_url }}
                            style={{ width: width, height: '100%' }}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { listener: handleScroll, useNativeDriver: false }
                    )}
                />
            </View>
            <View style={{ width: '100%', height: '60%', borderTopLeftRadius: 51, borderTopRightRadius: 51, backgroundColor: colors.backgroundColor, marginTop: 1, ...styles.shadowCustom3, paddingBottom: 100 }}>
                <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', top: '-5%' }}>
                    {[design, ...fabrics].map((_, index) => (
                        <View
                            key={index}
                            style={{
                                width: 9,
                                height: 9,
                                borderRadius: 4,
                                backgroundColor: index === activeIndex ? '#333' : '#ccc',
                                marginHorizontal: 4,
                            }}
                        />
                    ))}
                </View>
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: '8%', paddingBottom: 100, overflow: 'hidden'}}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginTop: '5%' }}>
                        <SetText size={24} type="bold">กรอกรายละเอียดเสื้อผ้า</SetText>
                    </View>

                    {/* Section 1 เลือกลายผ้า */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <SetText size={16} type="bold">ลายผ้า</SetText>
                            {fabric && <SetText color={colors.grey} size={14} type="small">คลัง : {fabrics.find((f: IFabric) => f.fabric_id === fabric)?.quantity ? fabrics.find((f: IFabric) => f.fabric_id === fabric)?.quantity : 'หมด'}</SetText>}
                        </View>
                        <SetText color={colors.grey} size={14} type="small">(1ผืน/1ตัว)</SetText>
                    </View>
                    <View style={{ paddingVertical: 12, borderColor: colors.line }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 15 }}>
                            {fabrics.map((item: IFabric, index: number) => {
                                return (
                                    <TouchableOpacity onPress={() => setFabric(item.fabric_id)} key={index} style={{ position: 'relative', height: 48, width: 48, alignItems: 'center', justifyContent: 'center', padding: 2, borderWidth: 1, borderRadius: 999, overflow: "hidden" }}>
                                        <Image source={{ uri: item.fabric_url }} style={{ width: 100, height: 100, borderRadius: 999 }} />
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
                            value={detail || ''}
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
                    <TextInput
                        keyboardType="number-pad"
                        value={quantity.toString()}
                        onChange={(e) => parseInt(e.nativeEvent.text) > 0 ? parseInt(e.nativeEvent.text) > total_quantity ? setQuantity(total_quantity) : setQuantity(parseInt(e.nativeEvent.text)) : setQuantity(0)}
                        style={{ borderWidth: 0.5, borderColor: colors.line, borderRadius: 10, height: 40, width: 100, textAlign: 'center', fontFamily: 'notoSansThai', padding: 8 }}
                    />
                    <TouchableOpacity disabled={quantity === total_quantity} style={quantity === total_quantity ? { opacity: 0.3 } : undefined} onPress={increaseQuantity} onLongPress={increaseQuantity10}>
                        <Iconify icon="simple-line-icons:plus" size={24} color={colors.whereblack} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity disabled={!isReady} onPress={onButtonSubmit} style={[{ backgroundColor: isReady ? colors.mediumpink : colors.grey, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 }, styles.shadowCustom]}>
                    <SetText size={16} type="bold" color={colors.white}>เพิ่มลงตะกร้า</SetText>
                </TouchableOpacity>
            </View>
        </WrapBackground>
    );
}

