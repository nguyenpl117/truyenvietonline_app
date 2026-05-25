import { Buffer } from 'buffer';
import AsyncStorage from "@react-native-async-storage/async-storage";

const username = 'app_truyenviet';
const appPassword = 'jU90 DDFd B9M0 LlFI sbiV gn5y';
const baseUrl = 'https://truyenvietonline.com/wp-json/truyen-api/v1';

const tokenApp = Buffer
    .from(`${username}:${appPassword}`)
    .toString('base64');



// 👉 GET TOKEN ĐÚNG CÁCH
export const getToken = async () => {
    const tk = await AsyncStorage.getItem('TOKEN');
    return tk || null;
};

export const getUser = async () => {
    const us =  await AsyncStorage.getItem('user');
    return us || null;
};



// 👉 CREATE HEADERS (QUAN TRỌNG)
const createHeaders = (token) => ({
    'X-App-Auth': `Basic ${tokenApp}`,
    'Authorization': token ? `Bearer ${token}` : '',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
    'Referer': 'https://truyenvietonline.com',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
});


export const getTruyenDetail = async (id) => {
    try {

        const token = await getToken();
        const response = await fetch(`${baseUrl}/detail/${id}`, {
            method: 'GET',
            headers: createHeaders(token),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('getTruyenDetail lỗi:', error.message);
        throw error;
    }
};



// ===================== FAVORITE =====================
export const favoriteTruyenDetail = async (id) => {
    try {
        const token = await getToken();

        const response = await fetch(`${baseUrl}/favorites/${id}`, {
            method: 'GET',
            headers: createHeaders(token),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Không lấy được dữ liệu');
        }

        return data;

    } catch (error) {
        console.error('favoriteTruyenDetail lỗi:', error.message);
        throw error;
    }
};


// ===================== PROFILE =====================
export const getProfile = async () => {
    try {
        const token = await getToken();
        if (!token) return null;

        const response = await fetch(`${baseUrl}/me`, {
            method: 'GET',
            headers: createHeaders(token),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error');
        }
        await AsyncStorage.setItem(
            'user',
            JSON.stringify(data.user)
        );
        return data.user; // 👈 QUAN TRỌNG
    } catch (error) {
        console.error('getProfile lỗi:', error.message);
        throw error;
    }
};




export const checkLogin = async () => {

    try {

        const token = await AsyncStorage.getItem('TOKEN');
        const user = await AsyncStorage.getItem('user');

        // chưa login
        if (!token || !user) {
            return false;
        }

        // parse user
        const parsedUser = JSON.parse(user);

        // user lỗi
        if (!parsedUser?.id) {
            return false;
        }

        // login OK
        return {
            token,
            user: parsedUser,
        };

    } catch (error) {

        console.log('checkLogin error', error);

        return false;
    }
};



export const submitRating = async (truyenId, rating, comment) => {

    try {
        const token = await getToken();
        if (!token) return null;
        const response = await fetch(
            `${baseUrl}/rating?v=2`,
            {
                method: 'POST',
                headers: await createHeaders(token),
                body: JSON.stringify({
                    truyen_id: truyenId,
                    rating,
                    comment,
                }),
            }
        );

        const text = await response.text();

        console.log('RAW RESPONSE:', text);

        const data = JSON.parse(text);

        console.log("data", data)

        if (!response.ok) {
            throw new Error(
                data.message || 'Đánh giá thất bại'
            );
        }

        return data;

    } catch (error) {

        console.log('checkLogin error', error);

        return false;
    }


};


export const toggleStoryNotification = async (truyenId, enabled) => {

    try {
        const token = await getToken();
        if (!token) return null;
        const response = await fetch(
            `${baseUrl}/notification`,
            {
                method: 'POST',
                headers: await createHeaders(token),
                body: JSON.stringify({
                    truyen_id: truyenId,
                    enabled,
                }),
            }
        );

        const text = await response.text();

        const data = JSON.parse(text);

        if (!response.ok) {
            throw new Error(
                data.message || 'Bật/Tắt thông báo thất bại'
            );
        }

        return data;

    } catch (error) {

        console.log('Bật/Tắt thông báo error', error);

        return false;
    }


};




export const saveFcmToken = async (device_type, fcm_token) => {

    try {
        const token = await getToken();
        if (!token) return null;
        const response = await fetch(
            `${baseUrl}/save-fcm-tokens`,
            {
                method: 'POST',
                headers: await createHeaders(token),
                body: JSON.stringify({
                    device_type,
                    fcm_token,
                }),
            }
        );

        const text = await response.text();

        console.log('RAW RESPONSE:', text);

        const data = JSON.parse(text);

        console.log("data", data)

        if (!response.ok) {
            throw new Error(
                data.message
            );
        }

        return data;

    } catch (error) {

        console.log('checkLogin error', error);

        return false;
    }


};
