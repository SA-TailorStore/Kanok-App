import { colors, styles } from "@/utils/styles";
import { View } from "react-native";
import { Iconify } from "react-native-iconify";
import TabBarItem from "./TabBarItem";
import HomeIcon from "@/assets/icons/home";
import { useNavigationState } from "@react-navigation/native";

export type TabBarItemProps = {
  icon: React.ReactDOM | any;
  title: string;
}

export default function TabBar() {
  const routeName = useNavigationState(state => state.routes[state.index].name);

  const userMenu: TabBarItemProps[] = [
    {
      icon: routeName.match("/home-page/index") ? <HomeIcon /> : <Iconify icon="solar:home-2-bold" size={26} color={colors.grey} />,
      title: 'Home'
    },
    {
      icon: <Iconify icon="iconamoon:history" size={26} color={colors.grey} />,
      title: 'My Order'
    },
    {
      icon: <Iconify icon="tabler:message" size={26} color={colors.grey} />,
      title: 'Inbox'
    },
    {
      icon: <Iconify icon="mdi:storefront-plus" size={26} color={colors.grey} />,
      title: 'My Account'
    }
  ]

  return (
    <View style={[styles.tapBarContainer, styles.shadowCustom2]}>
      {userMenu.map((item, index) => <TabBarItem key={index} icon={item.icon} title={item.title} />)}
    </View>
  )
}