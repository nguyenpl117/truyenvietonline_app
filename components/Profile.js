import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAcc, getToken, getUser} from "../api/truyenApiAuth";
import DeviceInfo from "react-native-device-info";
import Toast from "react-native-toast-message";
const currentBuild = DeviceInfo.getVersion();
const MENU_ITEMS = [
  { id: 'settings', title: 'Cấu hình', icon: 'settings-outline', color: '#64748b', view: '' },
  { id: 'guide', title: 'Hướng dẫn sử dụng', icon: 'help-circle-outline', color: '#3b82f6', view: '' },
  { id: 'about', title: 'Giới thiệu', icon: 'information-circle-outline', color: '#10b981', view: '' },
  { id: 'login', title: 'Đăng nhập', icon: 'log-in-outline', color: '#ef4444', view: 'LoginScreen' },
  { id: 'logout', title: 'Thoát', icon: 'log-out-outline', color: '#ef4444', view: '' },
];

export default function Profile({ navigation }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const tk = await getToken();
      const userCache = await getUser();

      setToken(tk);

      if (userCache) {
        setUser(JSON.parse(userCache));
      }
    };

    loadData();
  }, []);

  const isLoggedIn = !!token && !!user;

  // ================= MENU FILTER =================
  const menu = MENU_ITEMS.filter(item => {
    if (item.id === 'login') {
      return !isLoggedIn; // chỉ hiện login khi chưa đăng nhập
    }
    if (item.id === 'logout') {
      return isLoggedIn; // chỉ hiện login khi chưa đăng nhập
    }
    return true;
  });

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {

      await AsyncStorage.removeItem('TOKEN');
      await AsyncStorage.removeItem('user');

      setToken(null);
      setUser(null);

      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Đăng xuất thành công',
      });

    } catch (error) {
      console.log('logout error', error);
    }
  };

  // ================= HANDLE CLICK =================
  const handlePress = async (item) => {
    if (item.id === 'login') {
      navigation.navigate('LoginScreen');
      return;
    }

    if (item.id === 'logout') {
      Alert.alert(
          'Đăng xuất',
          'Bạn có chắc muốn đăng xuất?',
          [
            {
              text: 'Huỷ',
              style: 'cancel',
            },
            {
              text: 'Đăng xuất',
              onPress: handleLogout,
            },
          ]
      );
      return;
    }
    return;
    // navigation.navigate(item.view);
  };

  const deleteAccount = async () => {
    try {

      const deleteStatus = await deleteAcc();
      if(deleteStatus.success){
        setToken(null);
        setUser(null);

        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Xóa tài khoản thành công',
        });

        navigation.navigate('MainTabs');
      }



    } catch (error) {
      console.log('logout error', error);
    }
  }

  const  handleDelete = async () => {
    Alert.alert(
        'Xóa tài khoản',
        'Bạn có chắc muốn xóa tài khoản?',
        [
          {
            text: 'Huỷ',
            style: 'cancel',
          },
          {
            text: 'Đăng xuất',
            onPress: deleteAccount,
          },
        ]
    );
  }

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tài khoản</Text>
        </View>

        <ScrollView style={styles.content}>

          {/* USER INFO */}
          {isLoggedIn && (
              <View style={{ flexDirection: 'row',
                paddingHorizontal: 20,
                paddingTop: 20,
                alignItems: 'center',
              justifyContent: 'space-between'}} >
               <View style={styles.userBox}>
                 <View>
                   <Image
                       source={{ uri: 'https://truyenvietonline.com/wp-content/themes/truyenviet/assets/images/logo-truyen-viet-online.png' }}
                       style={styles.logo}
                       resizeMode="contain"
                   />
                 </View>
                 <View>
                   <Text >Xin chào, <Text style={styles.userName}>{user?.name}</Text></Text>
                   <Text style={styles.userEmail}>{user?.email}</Text>
                 </View>
               </View>
                <View>
                  <TouchableOpacity
                      onPress={() => handleDelete()}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ff0000" />
                  </TouchableOpacity>
                </View>
              </View>
          )}

          {/* MENU */}
          <View style={styles.menuContainer}>
            {menu.map((item, index) => (
                <TouchableOpacity
                    onPress={() => handlePress(item)}
                    key={item.id}
                    style={[
                      styles.menuItem,
                      index === menu.length - 1 && styles.lastMenuItem
                    ]}
                >
                  <View style={styles.menuLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                      <Ionicons name={item.icon} size={22} color={item.color} />
                    </View>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                </TouchableOpacity>
            ))}
          </View>

          {/* VERSION */}
          <View style={styles.footer}>
            <Text style={styles.versionText}>Phiên bản {currentBuild}</Text>
          </View>

        </ScrollView>
      </View>
  );
}
const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#f8fafc', }, header: { paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', }, headerTitle: { fontSize: 24, fontWeight: '800', color: '#0f172a', }, content: { flex: 1, }, menuContainer: { marginTop: 20, backgroundColor: '#fff', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#f1f5f9', }, menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', }, lastMenuItem: { borderBottomWidth: 0, }, menuLeft: { flexDirection: 'row', alignItems: 'center', }, iconContainer: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15, }, menuTitle: { fontSize: 16, fontWeight: '600', color: '#334155', }, footer: { marginTop: 40, alignItems: 'center', paddingBottom: 40, }, versionText: { fontSize: 13, color: '#94a3b8', },

  userBox:{
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',

  },
  logo:{
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginRight: 15
  },
  userName:{
      fontWeight: 'bold'
  },
  userEmail:{
    fontSize: 13
  }
});
