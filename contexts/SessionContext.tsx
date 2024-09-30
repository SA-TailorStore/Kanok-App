import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect } from "react";

const SessionContext = createContext<any>(null);

export const useSession = () => useContext(SessionContext);

export default function SessionProvider({ children }: any) {
    const router = useRouter();
    
    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('@access_token')
            console.log(token)
            if (token != null) {
                router.replace("/user-tab/home");
            }
        }
        getToken();
    }, [])

    const setToken = async (token: string) => {
        await AsyncStorage.setItem('@access_token', token);
        router.replace("/user-tab/home");
    }

    const removeToken = async () => {
        await AsyncStorage.removeItem('@access_token');
        router.replace("/sign-in");
    }

    const getToken = async () => {
        const token = await AsyncStorage.getItem('@access_token')
        console.log(token)
        if (token != null) {
            router.replace("/user-tab/home");
        }
    }
    return (
        <SessionContext.Provider value={{ setToken, removeToken }}>
            {children}
        </SessionContext.Provider>
    )
}