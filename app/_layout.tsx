import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
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
  
  return ( <Slot/> );
}
