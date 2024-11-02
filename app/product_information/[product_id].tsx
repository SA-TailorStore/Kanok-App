import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { IFabric } from "@/types/IFabric";
import { IProduct } from "@/types/IProduct";
import { colors, styles } from "@/utils/styles";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { View, Image, ScrollView, TouchableOpacity, FlatList, Dimensions, TextInput, Animated, } from "react-native";
import { Iconify } from "react-native-iconify";

export const sizeList = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductInfomation() {
    const route = useRoute() as { params: { product_id: string } };
    const { product_id } = route.params;
    const [product, setProduct] = useState<IProduct>();
    const [fabric, setFabric] = useState<IFabric>();

    const { width } = Dimensions.get('window');
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setActiveIndex(index);
    };

    const fetchFabric = async (id: number) => {
        console.log(id)
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/fabric/get', {
            fabric_id: Number(id)
        }).then((res) => {
            if (res.status === 200) {
                setFabric(res.data.data);
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    const fetchProduct = async () => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/product/get', {
            product_id: product_id
        }).then((res) => {
            if (res.status === 200) {
                setProduct(res.data.data);
                fetchFabric(res.data.data.fabric_id);
            }
        }).catch((err) => {
            console.log('te',err)
        });
    }

    useEffect(() => {
        console.log('Hello World')
        fetchProduct();
    }, [])

    if (!product || !fabric) return null
    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '60%', marginBottom: '-15%' }}>
                <FlatList
                    data={[fabric]}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={
                        <Image
                            source={{ uri: product.design_url }}
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
                    {[0, 0].map((_, index) => (
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
                    contentContainerStyle={{ paddingHorizontal: '8%', paddingBottom: 100, overflow: 'hidden' }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginTop: '5%' }}>
                        <SetText size={24} type="bold">รายละเอียดเสื้อผ้า</SetText>
                    </View>

                    {/* Section 1 เลือกลายผ้า */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <SetText size={16} type="bold">ลายผ้า</SetText>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 12, borderColor: colors.line }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 15 }}>
                            <TouchableOpacity disabled style={{ position: 'relative', height: 48, width: 48, alignItems: 'center', justifyContent: 'center', padding: 2, borderWidth: 1, borderRadius: 999, overflow: "hidden" }}>
                                <Image source={{ uri: fabric.fabric_url }} style={{ width: 100, height: 100, borderRadius: 999 }} />
                            </TouchableOpacity>
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
                            <TouchableOpacity disabled style={{ height: 41, width: 54, alignItems: 'center', justifyContent: 'center', padding: 2, borderWidth: 1, borderRadius: 12, borderColor: colors.mediumpink }}>
                                <SetText size={16} color={colors.mediumpink}>{product.size}</SetText>
                            </TouchableOpacity>
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
                            value={product.detail || ''}
                            editable={false}
                        />
                    </View>
                </ScrollView>
            </View>
        </WrapBackground>
    );
}

