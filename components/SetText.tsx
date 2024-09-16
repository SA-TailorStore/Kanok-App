import { Text, type TextProps, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from "expo-font";
import { useEffect } from "react";

export type SetTextProps = TextProps & {
  type?: 'default' | 'bold';
  className?: string;
};

export function SetText({
  type = 'default',
  ...rest
}: SetTextProps) {

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
    <Text
      style={[rest.style,
        type == 'default' ? styles.default : undefined,
        type === 'bold' ? styles.bold : undefined,
      ]}
      >{rest.children}</Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'notoSansThai',
  },
  bold: {
    fontFamily: 'notoSansThaiBold',
  },
});
