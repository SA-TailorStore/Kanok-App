import { colors, styles } from "@/utils/styles";
import { TouchableOpacity, View } from "react-native";
import { SetText } from "./SetText";
import { IProduct } from "@/types/IProduct";
import { Iconify } from "react-native-iconify";
import { useState } from "react";

export default function ConfirmOrderCard({ item, setSelectedProduct, shadow }: { item: IProduct, setSelectedProduct: React.Dispatch<React.SetStateAction<string | null>>, shadow?: boolean }) {
    const [quantity, setQuantity] = useState<number>(1);
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <>
            <View style={[{ backgroundColor: colors.white, height: 160, borderRadius: 16, padding: 16 }, shadow ? styles.shadowCustom : undefined]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SetText type="bold" size={16}>รหัสสินค้า : {item.product_id}</SetText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5, gap: 10 }}>
                    <View style={{ width: 100, height: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                        <SetText>รูป</SetText>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', opacity: 0.5 }}>
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
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => setSelectedProduct(item.product_id)}><SetText type='bold' color={colors.mediumpink} size={16}></SetText></TouchableOpacity>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <SetText size={16} type="bold" color={colors.grey} style={{}}>x{quantity}</SetText>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}