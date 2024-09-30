import SessionProvider from "@/contexts/SessionContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    notoSansThai: require('@/assets/fonts/Noto_Sans_Thai/NotoSansThai-Regular.ttf'),
    notoSansThaiBold: require('@/assets/fonts/Noto_Sans_Thai/NotoSansThai-Bold.ttf'),
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
      <SessionProvider>
        <Stack screenOptions={{
          headerShown: false,
          statusBarStyle: 'auto',
          // statusBarTranslucent: true,
          // statusBarColor: 'transparent',
        }} />
      </SessionProvider>
    </ToastProvider>
  );
}
