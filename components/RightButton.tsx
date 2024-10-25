import { SetText } from "@/components/SetText";
import { colors } from "@/utils/styles";
import { TouchableOpacity } from "react-native";

export const RightButton = ({ title, action, disabled = false }: { title: string; action: () => void; disabled?: boolean }) => {
    return (
        <TouchableOpacity onPress={action} disabled={disabled}>
            <SetText size={20} type='bold' color={colors.white} style={{ opacity: disabled? 0.5 : 1 }}>{title}</SetText>
        </TouchableOpacity>
    );
};
