import { colors, styles } from '@/utils/styles';
import { Tabs } from 'expo-router';
import React from 'react';
import { Iconify } from 'react-native-iconify';
import HomeIcon from "@/assets/icons/home";
import AccountIcon from "@/assets/icons/account";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
        headerShown: false,
        tabBarStyle: styles.tapBarContainer,
        tabBarLabelStyle: { fontSize: 10, marginBottom: 10, marginTop: -10, fontFamily: 'notoSansThai' },
        tabBarIconStyle: { width: 30, height: 30 },
      }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            focused ? <HomeIcon /> : <Iconify icon="solar:home-2-bold" size={24} color={colors.grey} />
          ),
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          title: 'My Account',
          tabBarIcon: ({ color, focused }) => (
            focused ? <AccountIcon /> : <Iconify icon="mdi:account-outline" size={30} color={colors.grey} />
          ),
        }}
      />
    </Tabs>
  );
}
