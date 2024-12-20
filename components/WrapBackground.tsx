import { ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, View } from "react-native";

export default function WrapBackground({ color, children }: { color?: string, children: React.ReactNode }) {
    if (color) {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: color }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                        {children}
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        )
    } else return (
        <ImageBackground source={require('@/assets/images/background.png')} style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                    {children}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );

}