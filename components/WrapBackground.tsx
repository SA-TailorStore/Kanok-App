import { ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from "react-native";
import { SetText } from "./SetText";
import Toast from "./Toast";

export default function WrapBackground({ children }: { children: React.ReactNode }) {
    return (
        <ImageBackground source={require('@/assets/images/background.png')} style={{ width: '100%', height: '100%' }}>
            {/* <Toast /> */}
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                    {children}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    body: {
        flexGrow: 1,
        paddingTop: 8
    }
});
