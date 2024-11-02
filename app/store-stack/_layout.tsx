import CustomBackButton from "@/components/CustomBackButton";
import { SetText } from "@/components/SetText";
import { ToastProvider } from "@/contexts/ToastContext";
import { colors, headerTitleStyle } from "@/utils/styles";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";

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

  const { title } = useLocalSearchParams();

  return (
    <ToastProvider>
      <Stack screenOptions={
        {
          headerTitleAlign: 'center',
          headerTitleStyle: headerTitleStyle,
          headerLeft: () => <CustomBackButton />,
          headerTransparent: true,
        }
      }>
      </Stack>
    </ToastProvider>

  );
}
