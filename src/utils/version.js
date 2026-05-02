import { Alert, Linking, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const API_URL = "https://truyenvietonline.com/wp-json/app/v1/version?v="+ Date.now();

const getStoreLink = (data) => {
    if (Platform.OS === 'android') return data.android_link;
    if (Platform.OS === 'ios') return data.ios_link;
    return "https://truyenvietonline.com/app";
};

export const checkVersion = async () => {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const currentBuild = DeviceInfo.getVersion();

        const latestVersion =
            Platform.OS === 'ios'
                ? data.latest_version_ios
                : data.latest_version_android;

        if (currentBuild !== latestVersion && data.force_update) {
            Alert.alert(
                "Cập nhật bắt buộc",
                data.message || "Vui lòng cập nhật app để tiếp tục",
                [
                    {
                        text: "Cập nhật",
                        onPress: () => Linking.openURL(getStoreLink(data)),
                    }
                ],
                { cancelable: false }
            );
            return true; // ✅ cần update

        }

        return false; // ✅ không cần update

    } catch (e) {
        console.log("Check version error:", e);
        return false; // fallback: vẫn cho chạy app
    }
};

