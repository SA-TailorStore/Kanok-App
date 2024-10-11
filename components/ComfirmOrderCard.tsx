import { colors, styles } from "@/utils/styles";
import { Image, View } from "react-native";
import { SetText } from "./SetText";
import { IProduct } from "@/types/IProduct";
import { Iconify } from "react-native-iconify";
import { useEffect, useState } from "react";
import { ProductRequest } from "@/types/ProductRequest";
import { IDesign } from "@/types/IDesign";
import axios from "axios";

export default function ConfirmOrderCard({ item, setSelectedProduct, shadow }: { item: ProductRequest, setSelectedProduct: React.Dispatch<React.SetStateAction<string | null>>, shadow?: boolean }) {
    const [design, setDesign] = useState<IDesign>();

    const fetchDesign = async () => {
        console.log(typeof item.design_id)
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/design/get', {
            design_id: item.design_id
        }).then((res) => {
            if (res.status === 200) {
                setDesign(res.data.data);
                console.log(res.data.data)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchDesign();
        console.log(item)
    }, [])

    return (
        <>
            <View style={[{ backgroundColor: colors.white, height: 160, borderRadius: 16, padding: 16 }, shadow ? styles.shadowCustom : undefined]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SetText type="bold" size={16}>รหัสสินค้า : {item.design_id}</SetText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5, gap: 10 }}>
                    <View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 8, ...styles.shadowCustom }}>
                        {design && <Image source={{ uri: design?.design_url }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', opacity: 0.5 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ alignSelf: 'flex-start', borderWidth: 0.5, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: colors.backgroundColor, borderColor: colors.grey, borderRadius: 5 }}>
                                <SetText color={colors.black}>
                                    ลาย {item.fabric_id}, ไซส์ {item.size}
                                </SetText>
                                <Iconify style={{ transform: [{ rotate: '-90deg' }] }} icon='weui:back-filled' size={15} color={colors.whereblack} />
                            </View>
                            <SetText>ประเภท : {item.design_id}</SetText>
                            <SetText>คำอธิบาย : {item.detail.length > 20 ? item.detail.substring(0, 20) + '...' : item.detail}</SetText>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <SetText size={16} type="bold" color={colors.grey} style={{}}>x{item.total_quantity}</SetText>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}