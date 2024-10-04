import { colors } from "@/utils/styles";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SetText } from "./SetText";
import { useEffect, useState } from "react";

export type IFilterTab = {
    title: string,
    status: string
}

export const filterTab: IFilterTab[] = [
    {
        title: 'รอการดำเนินการ',
        status: 'pending'
    },
    {
        title: 'ที่ต้องชำระ',
        status: 'payment'
    },
    {
        title: 'กำลังดำเนินการ',
        status: 'processing'
    },
    {
        title: 'ที่ต้องได้รับ',
        status: 'receiced'
    },
    {
        title: 'สำเร็จ',
        status: 'success'
    },
    {
        title: 'ยกเลิก',
        status: 'cancel'
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
                        <TouchableOpacity key={index} onPress={() => setSelected(item.status)}>
                            <SetText type={selected===item.status? 'bold': 'default'} color={selected===item.status? colors.black : colors.grey} style={[{ paddingHorizontal: 18, borderColor: colors.mediumpink }, selected === item.status? { borderBottomWidth: 1 } : undefined]} size={14}>{item.title}</SetText>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}