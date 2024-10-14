import { colors } from "@/utils/styles";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SetText } from "./SetText";
import { useEffect, useState } from "react";
import { storeOrderState, userOrderState } from "@/utils/orderState";
import { useSession } from "@/contexts/SessionContext";

export type IFilterTab = {
    title: string,
    description?: string,
    status: string[],
}

export const filterTab: IFilterTab[] = [
    {
        title: 'รอการดำเนินการ',
        status: ['pending']
    },
    {
        title: 'ที่ต้องชำระ',
        status: ['payment']
    },
    {
        title: 'กำลังดำเนินการ',
        status: ['processing_user', 'received_tailor', 'processing_tailor', 'received_shop', 'success_tailor']
    },
    {
        title: 'ที่ต้องได้รับ',
        status: ['received_user']
    },
    {
        title: 'สำเร็จ',
        status: ['success_user']
    },
    {
        title: 'ยกเลิก',
        status: ['cancel']
    },
]

export default function OrderTab({ output }: { output: (status: string) => void }) {
    const [selected, setSelected] = useState<string>('pending');
    const [tab, setTab] = useState<IFilterTab[]>(filterTab);
    const { userContext } = useSession();

    useEffect(() => {
        output(selected);
    }, [selected])

    useEffect(() => {
        switch (userContext?.role) {
            case 'user':
                setTab(userOrderState);
                break;
            case 'store':
                setTab(storeOrderState);
                break;
            default:
                break;
        }
    })

    return (
        <View style={{ paddingVertical: 12, borderColor: colors.line }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'row'}}
                style={{ borderBottomWidth: 1, borderColor: colors.line }}
            >
                {tab.map((item: IFilterTab, index: number) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => setSelected(item.status[0])}>
                            <SetText type={ item.status.includes(selected)? 'bold': 'default'} color={item.status?.includes(selected)? colors.black : colors.grey} style={[{ paddingHorizontal: 18, borderColor: colors.mediumpink }, item.status?.includes(selected)? { borderBottomWidth: 1 } : undefined]} size={14}>{item.title}</SetText>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}