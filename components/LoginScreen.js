import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView, Image,
} from 'react-native';
import HeaderLight from "./HeaderLight";
import {loginUser, registerUser} from "../api/truyenApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        try {
            if (loading) return;
            if (!account || !password) {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Vui lòng nhập đầy đủ thông tin',
                });
                return;
            }

            // loading nếu có
            setLoading?.(true);

            // gọi API
            const result = await loginUser({
                account,
                password
            });

            if (!result?.success) {

                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: result?.message || 'Đăng nhập thất bại',
                });

                return;
            }
            // SAVE TOKEN
            if (result?.user?.token) {

                await AsyncStorage.setItem(
                    'TOKEN',
                    result.user.token
                );
            }

            // SAVE USER
            await AsyncStorage.setItem(
                'user',
                JSON.stringify(result.user)
            );


            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: result?.message || 'Đăng nhập thành công',
            });

            navigation.navigate('MainTabs');


        } catch (error) {
            console.log('LOGINUSER ERROR:', error);


            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: error.message || 'Đăng nhập thất bại',
            });

        } finally {

            setLoading?.(false);
        }
    };

    return (
        <View style={styles.container}>
            <HeaderLight textTitle={''} link={''} />
            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://truyenvietonline.com/wp-content/themes/truyenviet/assets/images/logo-truyen-viet-online.png' }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Tên tài khoản hoặc Email"
                    value={account}
                    onChangeText={setAccount}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Đăng Nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity   onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={styles.registerText}>
                        Chưa có tài khoản? Đăng ký
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
       justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    logo: {
        width: 138,
        height: 40,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#007bff',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    registerText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#007bff',
        fontSize: 16,
    },
});