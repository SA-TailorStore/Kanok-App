import { colors, styles } from "@/utils/styles";
import { Image, View } from "react-native";
import { SetText } from "./SetText";
import { Iconify } from "react-native-iconify";
import { useEffect, useState } from "react";
import { ProductRequest } from "@/types/ProductRequest";
import { IDesign } from "@/types/IDesign";
import axios from "axios";
import { DailyReportButton } from "./order-button/DailyReportButton";
import { IOrder } from "@/types/IOrder";
import { orderState } from "@/utils/orderState";

export default function ConfirmOrderCardTailor({ order_id, item, setSelectedProduct, shadow, showDailyReport = true }: { order_id: string, item: ProductRequest, setSelectedProduct?: React.Dispatch<React.SetStateAction<string | null>>, shadow?: boolean, showDailyReport?: boolean }) {
    const [design, setDesign] = useState<IDesign>();

    const fetchDesign = async () => {
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
    }, []);

    if (!design) return <ConfirmOrderCardSkeleton />;
    return (
        <>
            <View style={[{ backgroundColor: colors.white, borderRadius: 16, padding: 16 }, shadow ? styles.shadowCustom : undefined]}>
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
                    </View>

                </View>
                {showDailyReport && <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SetText size={14} type="bold" style={{}}>ความคืบหน้า</SetText>
                        <SetText size={14} type="bold" style={{}}>สำเร็จแล้ว {item.process_quantity}/{item.total_quantity} ตัว</SetText>
                    </View>
                    <View style={{ height: 6, borderRadius: 999, backgroundColor: colors.line }}>
                        <View style={{ height: 6, borderRadius: 999, backgroundColor: colors.primary, width: `${item.process_quantity / item.total_quantity * 100}%` }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <SetText size={14} type="bold" style={{}}></SetText>
                        {item.process_quantity !== item.total_quantity && <DailyReportButton order_id={order_id} product_id={item.product_id} />}
                    </View>
                </View>}
            </View>
        </>
    )
}

export function ConfirmOrderCardSkeleton() {
    return (
        <>
            <View style={{ backgroundColor: colors.white, height: 160, borderRadius: 16, padding: 16, ...styles.shadowCustom }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SetText type="bold" size={16}>รหัสสินค้า : -</SetText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5, gap: 10 }}>
                    <View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 8, ...styles.shadowCustom }}>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', opacity: 0.5 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ alignSelf: 'flex-start', borderWidth: 0.5, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: colors.backgroundColor, borderColor: colors.grey, borderRadius: 5 }}>
                                <SetText color={colors.black}>
                                    ลาย -, ไซส์ -
                                </SetText>
                                <Iconify style={{ transform: [{ rotate: '-90deg' }] }} icon='weui:back-filled' size={15} color={colors.whereblack} />
                            </View>
                            <SetText>ประเภท : -</SetText>
                            <SetText>คำอธิบาย : -</SetText>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <SetText size={16} type="bold" color={colors.grey} style={{}}>x1</SetText>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}