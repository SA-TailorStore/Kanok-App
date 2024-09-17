import { ToastProvider } from "@/contexts/ToastContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    notoSansThai: require('@/assets/fonts/Noto_Sans_Thai/NotoSansThai-Regular.ttf'),
    notoSansThaiBold: require('@/assets/fonts/Noto_Sans_Thai/NotoSansThai_Condensed-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ToastProvider>
      <Stack screenOptions={{
        headerShown: false,
        // statusBarStyle: 'auto',
        statusBarColor: '#FF7FA8',
      }} />
    </ToastProvider>
  );
}
