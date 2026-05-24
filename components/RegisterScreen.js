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
import {registerUser} from "../api/truyenApi";
import HeaderLight from "./HeaderLight";
import Toast from 'react-native-toast-message';
export default function RegisterScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        try {
            if (loading) return;
            // validate
            if (!username || !email || !password || !confirmPassword) {

                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Vui lòng nhập đầy đủ thông tin',
                });
                return;
            }

            // check password
            if (password !== confirmPassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Mật khẩu nhập lại không khớp',
                });
                return;
            }

            // loading nếu có
            setLoading?.(true);

            // gọi API
            const result = await registerUser({
                username,
                email,
                password,
                confirm_password: confirmPassword,
            });

            console.log('REGISTER SUCCESS:', result);

            if(result.success){
                Toast.show({
                    type: 'success',
                    text1: 'Thành công',
                    text2: result.message,
                });
                // reset form
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                // navigate nếu có
                navigation.navigate('LoginScreen');
            }



        } catch (error) {

            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: error.message,
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
                placeholder="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng Ký</Text>
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
        fontSize: 30,
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
});