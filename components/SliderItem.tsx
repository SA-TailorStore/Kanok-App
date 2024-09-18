import { SliderItemProps } from "@/app/user-tab/home";
import { View, Image, type ViewProps} from "react-native";
import { styles } from "@/utils/styles";

type SliderItem = ViewProps &{
    item: SliderItemProps;
    direction: 'start' | 'default' | 'end';
};

export default function SliderItem(
    {
        item,
        direction = 'default',
        ...props
    }: SliderItem) {
    if (direction === 'start') {
        return (
            <View style={[styles.imageSliderItem, { marginLeft: 30 }]} {...props}>
                <Image source={item.img_url} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            </View>
        );
    } else if (direction === 'end') {
        return (
            <View style={[styles.imageSliderItem, { marginRight: 30 }]} {...props}>
                <Image source={item.img_url} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            </View>
        );
    } else return (
        <View style={[styles.imageSliderItem, { marginHorizontal: 10 }]} {...props}>
            <Image source={item.img_url} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
        </View>
    );
}