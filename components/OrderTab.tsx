import { colors } from "@/utils/styles";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SetText } from "./SetText";
import { useEffect, useState } from "react";

export type IFilterTab = {
    title: string,
    status: string[]
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
        status: ['processing_user', 'receiced_tailor', 'processing_tailor', 'receiced_shop', 'success_tailor']
    },
    {
        title: 'ที่ต้องได้รับ',
        status: ['receiced_user']
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

    useEffect(() => {
        output(selected);
    }, [selected])

    return (
        <View style={{ paddingVertical: 12, borderColor: colors.line }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'row'}}
                style={{ borderBottomWidth: 1, borderColor: colors.line }}
            >
                {filterTab.map((item: IFilterTab, index: number) => {
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