import { SliderItemProps } from "@/app/user/home-page";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import SliderItem from "@/components/SliderItem";
import { styles } from "@/utils/styles";
import { SetText } from "./SetText";
import { useEffect, useState } from "react";

export default function Slider({ items }: { items: SliderItemProps[] }) {
    const [selected, setSelected] = useState(0);

    return (
        <View style={styles.imageSliderContainer}>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return <SliderItem key={index} item={item} direction={index === 0 ? 'start' : index === items.length - 1 ? 'end' : 'default'} />
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                // pagingEnabled
                onScroll={(e) => {
                    const offset = e.nativeEvent.contentOffset.x;
                    const index = Math.round(offset / (Dimensions.get('window').width - 60));
                    setSelected(index);
                }}
            />

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {items.map((_, index) => <SetText size={40} key={index} style={selected === index ? style.pointSelected : style.point}>.</SetText>)}
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    point: {
        marginTop: -27,
        fontSize: 40,
        color: '#E4E2E2'
    },
    pointSelected: {
        marginTop: -27,
        fontSize: 40,
        color: '#524A4E'
    }
})