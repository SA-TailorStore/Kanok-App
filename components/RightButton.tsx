import { SetText } from "@/components/SetText";
import { colors } from "@/utils/styles";
import { TouchableOpacity } from "react-native";

export const RightButton = ({ title, action, disabled = false, color = colors.white }: { title: string; action?: () => void; disabled?: boolean, color?: string }) => {
    return (
        <TouchableOpacity onPress={action} disabled={disabled}>
            <SetText size={20} type='bold' color={color} style={{ opacity: disabled? 0.5 : 1 }}>{title}</SetText>
        </TouchableOpacity>
    );
};
