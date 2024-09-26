import { ScrollView, TouchableOpacity, View, Image, TextInput } from "react-native";
import { SetText } from "./SetText";
import { colors, styles } from "@/utils/styles";
import { fabricList, sizeList } from "@/app/user-stack/add-information/[design_id]";
import { IFabric } from "@/types/IFabric";
import { Iconify } from "react-native-iconify";
import { useState } from "react";

export default function EditBottomSheet({ product_id }: { product_id: string | null }) {
    const [fabric, setFabric] = useState<number>(0);
    const [size, setSize] = useState<string>('');

    return (
        <>
            {product_id && <><View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: colors.black, opacity: 0.5 }}></View>
                <View style={{ width: '100%', height: '70%', borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: colors.backgroundColor, marginTop: 1, ...styles.shadowCustom3, paddingBottom: 100, position: 'absolute', bottom: 0 }}>
                    <ScrollView
                        contentContainerStyle={{ paddingHorizontal: '5%', paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            onMoveShouldSetResponder={() => true}
                            onPointerMove={(e) => console.log(e.nativeEvent)}
                            // onResponderMove={(e) => console.log(e.nativeEvent)}
                            style={{ width: '100%', alignSelf: 'center', marginTop: '5%', flexDirection: 'row', gap: 10 }}
                        >
                            <View style={{ width: 100, height: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                                <SetText>รูป</SetText>
                            </View>
                            <SetText type='bold' color={colors.black}>
                                รหัสสินค้า : {product_id}
                            </SetText>
                            {/* close button on right top */}
                            <TouchableOpacity onPress={() => product_id = null} style={{ position: 'absolute', right: 0, top: 0 }}>
                                <Iconify icon="ant-design:close" size={16} color={colors.grey} />
                            </TouchableOpacity>

                        </View>

                        {/* Section 1 เลือกลายผ้า */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
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
                    </ScrollView>
                </View>
                <View style={{ borderTopWidth: 1, borderRadius: 20, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: colors.white, position: 'absolute', width: '100%', bottom: 0, height: 100, justifyContent: 'center', paddingHorizontal: '5%', zIndex: 90 }}>
                    <TouchableOpacity onPress={() => console.log('test')} style={[{ backgroundColor: colors.mediumpink, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' }, styles.shadowCustom]}>
                        <SetText size={16} type="bold" color={colors.white}>ยืนยัน</SetText>
                    </TouchableOpacity>
                </View>
            </>}
        </>
    );
}