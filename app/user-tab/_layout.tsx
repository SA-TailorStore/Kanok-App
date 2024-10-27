import { colors, styles } from '@/utils/styles';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Iconify } from 'react-native-iconify';
import HomeIcon from "@/assets/icons/home";
import AccountIcon from "@/assets/icons/account";
import OrderIcon from "@/assets/icons/order";
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const router = useRouter();
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
        name="order/index"
        options={{
          title: 'My Order',
          tabBarIcon: ({ color, focused }) => (
            focused ? <OrderIcon /> : <Iconify icon="iconamoon:history" size={24} color={colors.grey}  />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="inbox/index"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, focused }) => (
            focused ? <InboxIcon /> : <Iconify icon="tabler:message" size={24} color={colors.grey} />
          ),
        }}
      /> */}
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
