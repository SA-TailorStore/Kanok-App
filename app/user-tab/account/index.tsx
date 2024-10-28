import { View, TouchableOpacity, Image } from "react-native";
import { colors, styles } from "@/utils/styles";
import { useRouter, } from "expo-router";
import WrapBackground from "@/components/WrapBackground";
import { SetText } from "@/components/SetText";
import { Iconify } from "react-native-iconify";
import SettingMenuItem from "@/components/SettingMenuItem";
import { useEffect, useState } from "react";
import { useSession } from "@/contexts/SessionContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserResponse } from "@/types/IUser";

export type SettingMenuProps = {
    icon: JSX.Element;
    title: string;
    detail: string;
    color?: string;
    to: () => void;
}

export default function AccountPage() {
    const { removeToken, userContext } = useSession();
    const router = useRouter();

    const settingMenu: SettingMenuProps[] = [
        // {
        //     icon: <Iconify icon="ion:notifcations" size={30} color={colors.whereblack} />,
        //     title: 'การแจ้งเตือน',
        //     detail: 'เปลี่ยนการแจ้งเตือน',
        //     to: () => router.push('/')
        // },
        // {
        //     icon: <Iconify icon="mdi:about" size={30} color={colors.whereblack} />,
        //     title: 'ติดต่อเรา',
        //     detail: 'ช่องทางการติดต่อ',
        //     to: () => router.push('/')
        // },
        // {
        //     icon: <Iconify icon="ph:password-fill" size={30} color={colors.whereblack} />,
        //     title: 'เปลี่ยนรหัสผ่าน',
        //     detail: 'เปลี่ยนรหัสผ่านของฉัน',
        //     to: () => router.push('/')
        // },
        // {
        //     icon: <Iconify icon="lucide:user-x" size={30} color={colors.whereblack} />,
        //     title: 'ลบบัญชีของฉัน',
        //     color: colors.danger,
        //     detail: 'ลบบัญชีของฉัน',
        //     to: () => router.push('/')
        // },
        {
            icon: <Iconify icon="majesticons:logout" size={30} color={colors.whereblack} />,
            title: 'ออกจากระบบ',
            detail: 'ออกจากระบบการใช้งาน',
            to: () => removeToken()
        }
    ]

    if (!userContext) return null;

    return (
        <WrapBackground color={colors.backgroundColor}>
            <View style={[{ width: '100%', height: '25%', borderBottomRightRadius: 51, borderBottomLeftRadius: 51, backgroundColor: colors.mediumpink }, styles.shadowCustom2]}>
                <SetText size={30} type='bold' style={{ marginTop: '16%', marginLeft: '4%' }}> My Account</SetText>
            </View>
            <View style={[{ width: '90%', height: '22%', borderRadius: 16, backgroundColor: colors.white, position: 'absolute', zIndex: 99, top: '13%', alignSelf: 'center', paddingHorizontal: '3%' }, styles.shadowCustom]}>
                <View style={{ width: '100%', height: '55%', flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.line, alignItems: "center", gap: 10 }}>
                    <View style={{ position: 'relative', alignItems: 'center', justifyContent: "center", width: 70, height: 70, borderRadius: 999, borderWidth: 2, backgroundColor: colors.white }}>
                        {userContext.user_profile_url !== '-' && <Image source={{ uri: userContext.user_profile_url }} style={{ width: '100%', height: '100%', objectFit: 'fill', borderRadius: 999 }} />}
                    </View>
                    <View>
                        <SetText type='bold' size={20}>{userContext.display_name}</SetText>
                        <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center', height: 30, gap: 6, }, { marginTop: -4 }]} onPress={() => router.push('/user-stack/change-profile')}>
                            <SetText size={16} color={colors.grey}>แก้ไขข้อมูลส่วนตัว</SetText>
                            <Iconify icon="weui:back-filled" size={14} color={colors.grey} style={{ transform: [{ rotate: '180deg' }, { scaleX: 1.5 }] }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: '100%', height: '40%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                    <SettingMenuItem item={
                        {
                            icon: <Iconify icon="bx:bx-map" size={30} color={colors.whereblack} />,
                            title: 'ที่อยู่ของฉัน',
                            detail: 'เปลี่ยนที่อยู่ในการจัดส่ง',
                            to: () => router.push('/user-stack/my-address')
                        }
                    } />
                </View>
            </View>

            <View style={{ width: '100%', height: '100%', marginTop: '25%', paddingHorizontal: '5%', gap: 8 }}>
                <SetText size={30} type='bold'>Settings</SetText>
                <View style={[{ flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 10, gap: 5, backgroundColor: colors.white, borderRadius: 16 }, styles.shadowCustom]}>
                    {settingMenu.map((item: SettingMenuProps, index) => {
                        return (
                            <View key={index} style={{ paddingVertical: 7, marginHorizontal: 10, borderTopWidth: index === 0 ? 0 : 1, borderColor: colors.line }}>
                                <SettingMenuItem item={item} />
                            </View>
                        )
                    })}
                </View>
            </View>
        </WrapBackground>
    );
}