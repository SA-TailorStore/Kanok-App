
import { ImageBackground, KeyboardAvoidingView, ScrollView, Platform, StatusBar, SafeAreaView, View, StyleSheet } from "react-native";

export default function WrapBackground({ children }: { children: React.ReactNode }) {
    return (
        <ImageBackground source={require('@/assets/images/background.png')} style={{ width: '100%', height: '100%'}}>
            <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={60} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <SafeAreaView style={styles.body}>
                    {children}
                </SafeAreaView>
            </KeyboardAvoidingView>
            <StatusBar backgroundColor={'#FF7FA8'} />
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    body: {
        width: "100%",
        height: "100%",
        fontFamily: 'notoSansThai',
    }
});
