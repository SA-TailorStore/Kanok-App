import { colors, styles } from "@/utils/styles";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SetText } from "./SetText";
import { IProduct } from "@/types/IProduct";
import { Iconify } from "react-native-iconify";
import { useState } from "react";

export default function ManageOrderCard({ item }: { item: IProduct }) {
    const [quantity, setQuantity] = useState<number>(1);
    const { width } = Dimensions.get('window');
    const [isHidden, setIsHidden] = useState<boolean>(false);

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

    return (
        <>
            {!isHidden && <Swipeable
                containerStyle={{ ...styles.shadowCustom, backgroundColor: colors.white, borderRadius: 16 }}
                renderRightActions={() => {
                    return (
                        <>
                            <View style={{ backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', width: 50 }}>
                                <SetText color={colors.white} size={10}>ลบ</SetText>
                            </View>
                            <View style={{ backgroundColor: colors.whereblack, alignItems: 'center', justifyContent: 'center', width: 50 }}>
                                <SetText color={colors.white} size={10}>ทำสำเนา</SetText>
                            </View>
                        </>
                    )
                }}
            >
                <View style={{ backgroundColor: colors.white, height: 160, borderRadius: 16, padding: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText type="bold" size={16}>รหัสสินค้า : {item.product_id}</SetText>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5, gap: 10 }}>
                        <View style={{ width: 100, height: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                            <SetText>รูป</SetText>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ alignSelf: 'flex-start', borderWidth: 0.5, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: colors.backgroundColor, borderColor: colors.grey, borderRadius: 5 }}>
                                    <SetText color={colors.black}>
                                        ลาย {item.fabric_id}, ไซส์ {item.size}
                                    </SetText>
                                    <Iconify style={{ transform: [{ rotate: '-90deg' }] }} icon='weui:back-filled' size={15} color={colors.whereblack} />
                                </TouchableOpacity>
                                <SetText>ประเภท : {item.design_id}</SetText>
                                <SetText>คำอธิบาย : {item.detail.length > 20? item.detail.substring(0,20)+'...' : item.detail}</SetText>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <SetText type='bold' color={colors.mediumpink} size={16}>แก้ไข</SetText>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <TouchableOpacity disabled={quantity === 1} style={quantity === 1 ? { opacity: 0.3 } : undefined} onPress={decreaseQuantity} onLongPress={decreaseQuantity10}>
                                        <Iconify icon="simple-line-icons:minus" size={24} color={colors.whereblack} />
                                    </TouchableOpacity>
                                    <SetText size={16} type="bold" style={{}}>{quantity}</SetText>
                                    <TouchableOpacity onPress={increaseQuantity} onLongPress={increaseQuantity10}>
                                        <Iconify icon="simple-line-icons:plus" size={24} color={colors.whereblack} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Swipeable>}
        </>
    )
}