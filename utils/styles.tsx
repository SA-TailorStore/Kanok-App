import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const colors = {
    backgroundColor: '#f9f9f9',
    whereblack: '#524A4E',
    wherewhite: '#f6f6f6',
    grey: '#AAAAAA',
    white: '#fff',
    red: '#FF4044',
    danger: '#D62C01',
    success: '#00DF80',
    primary: '#F875AA',
    mediumpink: '#F47E9A',
    line: '#CCCCCC'
};

export const headerTitleStyle = {
    fontFamily: 'notoSansThaiBold',
    color: colors.whereblack,
    fontSize: 25,
};

// tip: ไม่ต้องเขียน css ในนี้เขียนที่ไฟล์ของหน้านั้นๆเลย ง่ายกว่า!!!! 
export const styles = StyleSheet.create({
    logoUserContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 90,
        padding: 6,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'black',
    },
    formContainer: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 30,
        paddingVertical: 12,
        flexDirection: 'column',
    },
    choiceItem: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '48%',
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    shadowCustom: {
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 50 },
        shadowRadius: 18,
        shadowOpacity: 1,
        elevation: 7, // android
    },
    shadowCustom2: {
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: { width: 0, height: 60 },
        shadowRadius: 18,
        shadowOpacity: 1,
        elevation: 10, // android
    },
    shadowCustom3: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 12.9,
        elevation: 5, //android
    },
    imageSliderContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'column',
    },
    imageSliderItem: {
        width: width - 60,
        height: 150,
        alignItems: 'center',
    },
    tapBarContainer: {
        position: 'absolute',
        height: 60,
        width: width - 60,
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        left: 30,
        // justifyContent: 'space-around',
        // alignItems: 'center',
        zIndex: 999,
        bottom: 15,
    },
    tapBar: {
        alignItems: 'center',
        width: '100%'
    },
    orderCurrentContainer: {
        marginHorizontal: 30,
        height: 240,
        borderRadius: 20,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    toasterContainer: {
        borderRadius: 8,
        width: 343,
        alignSelf: 'center', 
        position: "absolute", 
        top: 20,
        zIndex: 999,
        overflow: 'hidden',
        gap: 8,
    },
    toastContainer: {
        backgroundColor: colors.white,
        borderRadius: 8,
        width: 343,
        height: 65, 
        alignSelf: 'center', 
        zIndex: 999,
        overflow: 'hidden'
    },
    toastTop: {
        height: 62,
        flexDirection: 'row',
    },
    toastHeader: {
        justifyContent: 'center',
    },
    toastIcon: {
        justifyContent: 'center',
        marginHorizontal: 20,
    }
});