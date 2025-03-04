import { colors } from "@/utils/styles";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SetText } from "./SetText";
import { useEffect, useState } from "react";
import { storeOrderState, tailorOrderState, userOrderState } from "@/utils/orderState";
import { useSession } from "@/contexts/SessionContext";
import { IOrder } from "@/types/IOrder";

export type IFilterTab = {
    title: string,
    description?: string,
    status: string[],
}

export default function OrderTab({ output, orders }: { output: (status: string[]) => void, orders: IOrder[] }) {
    const [selected, setSelected] = useState<string[]>(['all']);
    const [tab, setTab] = useState<IFilterTab[]>([]);
    const { userContext } = useSession();

    useEffect(() => {
        switch (userContext?.role) {
            case 'user':
                setTab(userOrderState);
                break;
            case 'store':
                setTab(storeOrderState);
                break;
            case 'tailor':
                setTab(tailorOrderState);
                break;
            default:
                break;
        }
    }, [])

    useEffect(() => {
        output(selected);
    }, [selected])

    return (
        <View style={{ paddingVertical: 12, borderColor: colors.line }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'row' }}
                style={{ borderBottomWidth: 1, borderColor: colors.line }}
            >
                <TouchableOpacity onPress={() => setSelected(['all'])}>
                    <SetText type={selected.includes('all') ? 'bold' : 'default'} color={selected.includes('all') ? colors.black : colors.grey} style={[{ paddingHorizontal: 18, borderColor: colors.mediumpink }, selected.includes('all') ? { borderBottomWidth: 1 } : undefined]} size={14}>ทั้งหมด</SetText>
                </TouchableOpacity>
                {tab.map((item: IFilterTab, index: number) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => setSelected(item.status)}>
                            <SetText type={item.status.includes(selected[0]) ? 'bold' : 'default'} color={selected.includes(item?.status[0]) ? colors.black : colors.grey} style={[{ paddingHorizontal: 16, borderColor: colors.mediumpink }, item.status?.includes(selected[0]) ? { borderBottomWidth: 1 } : undefined]} size={14}>{item.title}({orders?.filter((o) => item.status.includes(o.status)).length})</SetText>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}