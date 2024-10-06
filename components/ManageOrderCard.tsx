import { colors, styles } from "@/utils/styles";
import { Alert, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SetText } from "./SetText";
import { IProduct } from "@/types/IProduct";
import { Iconify } from "react-native-iconify";
import { useEffect, useState } from "react";
import { ProductRequest } from "@/types/ProductRequest";

export default function ManageOrderCard({ item, setSelectedProduct }: { item: ProductRequest, setSelectedProduct: React.Dispatch<React.SetStateAction<string|null>> }) {
    const [quantity, setQuantity] = useState<number>(item.total_quantity);
    const [isHidden, setIsHidden] = useState<boolean>(false);

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

    useEffect(() => {
        console.log(item)
    },[])

    return (
        <>
            {!isHidden && <Swipeable
                containerStyle={{ ...styles.shadowCustom, backgroundColor: colors.white, borderRadius: 16 }}
                renderRightActions={() => {
                    return (
                        <>
                            <TouchableOpacity onPress={createTwoButtonAlert} style={{ backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', width: 50 }}>
                                <SetText color={colors.white} size={10}>ลบ</SetText>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: colors.whereblack, alignItems: 'center', justifyContent: 'center', width: 50 }}>
                                <SetText color={colors.white} size={10}>ทำสำเนา</SetText>
                            </TouchableOpacity>
                        </>
                    )
                }}
            >
                <View style={{ backgroundColor: colors.white, height: 160, borderRadius: 16, padding: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText type="bold" size={16}>รหัสสินค้า : {item.design_id}</SetText>
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
                                <SetText>คำอธิบาย : {item.detail.length > 20 ? item.detail.substring(0, 20) + '...' : item.detail}</SetText>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                {/* <TouchableOpacity onPress={() => setSelectedProduct(item.product_id)}><SetText type='bold' color={colors.mediumpink} size={16}>แก้ไข</SetText></TouchableOpacity> */}
                                <SetText type='bold' color={colors.mediumpink} size={16}></SetText>
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