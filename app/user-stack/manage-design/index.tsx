import { SetText } from "@/components/SetText";
import WrapBackground from "@/components/WrapBackground";
import { colors } from "@/utils/styles";

export default function ManageDesign() {
    return (
        <WrapBackground color={colors.backgroundColor}>
            <SetText>Hello</SetText>
        </WrapBackground>
    );
}