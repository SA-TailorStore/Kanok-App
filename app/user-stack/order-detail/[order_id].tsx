import ConfirmOrderCard from "@/components/ComfirmOrderCard";
import Loading from "@/components/Loading";
import { filterTab, IFilterTab } from "@/components/OrderTab";
import { SetText } from "@/components/SetText";
import SettingMenuItem from "@/components/SettingMenuItem";
import WrapBackground from "@/components/WrapBackground";
import { useToast } from "@/contexts/ToastContext";
import { IProduct } from "@/types/IProduct";
import { colors, styles } from "@/utils/styles";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { Iconify } from "react-native-iconify";

const exampleData: IProduct[] = [
    {
        product_id: '0',
        design_id: 0,
        detail: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil suscipit accusantium placeat voluptatum, non a sunt sed incidunt itaque? Omnis nisi, in facere nam voluptas aliquid ducimus quidem voluptatum amet.',
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '1',
        design_id: 0,
        detail: "รายละเอียด2",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '2',
        design_id: 0,
        detail: "รายละเอียด3",
        size: 'XXL',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '0',
        design_id: 0,
        detail: "รายละเอียด",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '1',
        design_id: 0,
        detail: "รายละเอียด2",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '2',
        design_id: 0,
        detail: "รายละเอียด3",
        size: 'XXL',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '0',
        design_id: 0,
        detail: "รายละเอียด",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '1',
        design_id: 0,
        detail: "รายละเอียด2",
        size: 'S',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    },
    {
        product_id: '2',
        design_id: 0,
        detail: "รายละเอียด3",
        size: 'XXL',
        quantity: 1,
        fabric_id: 0,
        created_at: 0,
        created_by: 0,
    }
];

export default function OrderDetail() {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isShow2, setIsShow2] = useState<boolean>(false);
    const [statusIndex, setStatusIndex] = useState<number>(0);

    const router = useRouter();
    const route = useRoute() as { params: { order_id: string } };
    const navigation = useNavigation();
    const { order_id } = route.params;
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    const { showToast } = useToast();

    const status = 'processing';

    useEffect(() => {
        console.log(order_id);
        navigation.setOptions({
            headerTitle: "รายละเอียดคำสั่งซื้อ",
        });

        filterTab.map((item: IFilterTab, index: number) => {
            if (item.status === status) {
                setStatusIndex(index);
            }
        });
    }, [])

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={{ width: '100%', height: '7%', backgroundColor: colors.wherewhite }} />
            <ScrollView style={{ flex: 1, paddingBottom: '3%' }}>
                <View style={{ marginHorizontal: '5%', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, ...styles.shadowCustom }}>
                    <View style={{ backgroundColor: colors.mediumpink, padding: 10 }}>
                        <SetText type="bold" size={16} color={colors.white}>หมายเลขคำสั่งซื้อ #1234567890</SetText>
                    </View>
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.line }}>
                        <SetText size={14} color={colors.grey}>วันที่สั่งซื้อสินค้า</SetText>
                        <SetText size={14} color={colors.grey}>7 พ.ย. 27, 14:41</SetText>
                    </View>
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderColor: colors.line }}>
                        <SetText size={14} color={colors.whereblack} type='bold'>ข้อมูลการจัดส่ง</SetText>
                        <SetText size={14} color={colors.grey}>ยังไม่มีข้อมูลการจัดส่ง</SetText>
                    </View>
                    <View style={{ backgroundColor: colors.white, marginHorizontal: 10, paddingVertical: 5, marginBottom: 10 }}>
                        <SetText size={14} color={colors.whereblack} type='bold'>ที่อยู่ในการจัดส่ง</SetText>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '100%' }} onPress={() => console.log('go to my address')}>
                            <Iconify icon="bx:bx-map" size={20} color={colors.whereblack} />
                            <View style={{ flexDirection: 'column' }}>
                                <SetText color={colors.whereblack} size={12} type="bold" style={{ marginBottom: 0 }}>ภูมิระพี เสริญวณิชกุล</SetText>
                                <SetText color={colors.grey} type="small">ที่อยู่ xxxxxx</SetText>
                            </View>
                            <View style={{ position: 'absolute', right: 0 }}>
                                <Iconify icon="weui:back-filled" size={16} color={colors.whereblack} style={[{ transform: [{ rotate: '180deg' }] }]} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: '3%', marginHorizontal: '5%', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, ...styles.shadowCustom }}>
                    <TouchableOpacity style={{ padding: 10, gap: 10, overflow: 'hidden', flexDirection: 'row' }} onPress={() => setIsShow((s) => !s)}>
                        <View style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: colors.mediumpink, marginTop: 5 }} />
                        <View>
                            <SetText type="bold" size={14} color={colors.whereblack}>คำสั่งซื้อกำลังดำเนินการ</SetText>
                            <SetText size={14} color={colors.grey}>บลาๆๆๆ</SetText>
                        </View>
                        <View style={{ position: 'absolute', right: 12, alignSelf: 'center' }}>
                            <Iconify icon="weui:back-filled" size={16} color={colors.whereblack} style={[{ transform: [{ rotate: isShow ? '90deg' : '-90deg' }] }]} />
                        </View>
                    </TouchableOpacity>
                    {isShow && <View style={{ borderTopWidth: 0.5, marginHorizontal: 10, borderColor: colors.line }}>
                        {filterTab.slice(0, filterTab.length - 1).map((item: IFilterTab, index: number) => {
                            console.log(statusIndex);
                            return (
                                <StatusCard key={index} item={item} color={index <= statusIndex ? colors.mediumpink : colors.grey} />
                            )
                        })}
                    </View>}
                </View>
                <View style={{ marginTop: '3%', marginHorizontal: '5%', backgroundColor: colors.white, borderRadius: 10, ...styles.shadowCustom }}>
                    {isShow2 ?
                        <>
                            {exampleData.map((item, index) => (
                                <ConfirmOrderCard item={item} setSelectedProduct={setSelectedProduct} key={index} />
                            ))}
                        </> : <ConfirmOrderCard item={exampleData[0]} setSelectedProduct={setSelectedProduct} />

                    }
                    <TouchableOpacity onPress={() => setIsShow2((s) => !s)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', borderTopWidth: 1, borderColor: colors.line, paddingVertical: '3%' }}>
                        <SetText type='bold' size={14}>รวมจำนวนสินค้าทั้งหมด</SetText>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <SetText type='bold' size={14}>100 รายการ</SetText>
                            <Iconify icon="weui:back-filled" size={16} color={colors.whereblack} style={[{ transform: [{ rotate: isShow2 ? '90deg' : '-90deg' }] }]} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: '3%', marginHorizontal: '5%', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.white, ...styles.shadowCustom, marginBottom: '3%' }}>
                    <View style={{ padding: 10, gap: 10, overflow: 'hidden', flexDirection: 'row' }}>
                        <Iconify icon="streamline:credit-card-1-solid" size={20} color={colors.black} />
                        <View>
                            <SetText type="bold" size={14} color={colors.whereblack}>ข้อมูลการชำระเงิน</SetText>
                            <SetText size={14} color={colors.grey}>ชำระเงินสำเร็จ</SetText>
                        </View>
                        <View style={{ position: 'absolute', right: 12, alignSelf: 'center' }}>
                            <Iconify icon="lets-icons:check-fill" size={20} color={colors.success} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </WrapBackground>
    );
}

const StatusCard = ({ item, color }: { item: IFilterTab, color: string }) => {
    return (
        <View style={{ padding: 8, gap: 10, overflow: 'hidden', flexDirection: 'row' }}>
            <View style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: color, marginTop: 5 }} />
            <View>
                <SetText type="bold" size={14} color={colors.whereblack}>{item.title}</SetText>
                <SetText size={14} color={colors.grey}>{item.status}</SetText>
            </View>
        </View>
    )
}

