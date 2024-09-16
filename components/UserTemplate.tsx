
import TabBar from "./navigation/TabBar";
import WrapBackground from "./WrapBackground";

export default function UserTemplate({ children }: { children: React.ReactNode }) {
    return (
        <WrapBackground>
            <TabBar />
            {children}
        </WrapBackground>
    );

}
