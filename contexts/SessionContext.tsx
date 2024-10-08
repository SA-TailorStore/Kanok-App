import { UserResponse } from "@/types/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { ProductRequest } from "../types/ProductRequest";

const SessionContext = createContext<any>(null);

export const useSession = () => useContext(SessionContext);

export default function SessionProvider({ children }: any) {
    const router = useRouter();
    const [userContext, setUserContext] = useState<UserResponse | null>(null);
    const [tokenContext, setTokenContext] = useState<string | null>(null);
    const [productContext, setProductContext] = useState<ProductRequest[]>([]);

    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('@access_token')
            console.log(token)
            if (token != null) {
                await continueSession(token);
            }
        }
        getToken();
    }, [])

    const setToken = async (token: string) => {
        await AsyncStorage.setItem('@access_token', token);
        setTokenContext(token);
        await getUser();
    }

    const removeToken = async () => {
        await AsyncStorage.removeItem('@access_token');
        router.replace("/sign-in");
        setUserContext(null);
        setTokenContext(null);
    }

    const continueSession = async (token: string) => {
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/login/token', {
            token: token,
        }).then(async(res) => {
            if (res.data.status != "201") return removeToken();
            console.log(`New Access Token: ${res.data.token}`);
            setToken(res.data.token);
        }).catch((err) => {
            console.log('continueSession : ' + err)
        })
    }

    const checkRole = (role: string) => {
        switch (role) {
            case 'user':
                router.replace("/user-tab/home");
                break;
            case 'store':
                router.replace("/store-tab/home");
                break;
            default:
                router.replace("/sign-in");
                break;
        }
    }

    const getUser = async () => {
        // code here : get user data from @access_user
        const token = await AsyncStorage.getItem('@access_token');
        await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/user/token', {
            token: token,
        }).then(async (res) => {
            console.log(res.data.data);
            await setUserContext(res.data.data);
            await checkRole(res.data.data.role);
        }).catch((err) => {
            console.log('getUser : ' + err)
        })
    }

    const updateProduct = (product: ProductRequest) => {
        if (productContext.length == 0) {
            setProductContext([product]);
        } else {
            setProductContext([...productContext, product]);
        }
    }

    // const getUser = async () => {
    //     const token = await AsyncStorage.getItem('@access_token');
    //     const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/user/token', {
    //         token: token,
    //     });
    //     return response.data.data;
    // } 
    return (
        <SessionContext.Provider value={{ setToken, removeToken, userContext, tokenContext, productContext, updateProduct }}>
            {children}
        </SessionContext.Provider>
    )
}