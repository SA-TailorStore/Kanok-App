import { View, type ViewProps } from 'react-native';
import { SetText } from '../SetText';
import { styles } from '@/utils/styles';
import { TabBarItemProps } from './TabBar';

export default function TabBarItem({ icon, title, ...props }: TabBarItemProps & ViewProps) {
    return (
        <View style={styles.tapBar} {...props}>
            {icon}
            <SetText size={10}>{title}</SetText>
        </View>
    );
}