import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Alert, Linking, Platform, StyleSheet, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from './components/Home';
import BookDetail from './components/BookDetail';
import Reading from './components/Reading';
import Library from './components/Library';
import Ranking from './components/Ranking';
import Profile from './components/Profile';
import BookList from './components/BookList';
import Search from './components/Search';
import BookTacGia from "./components/BookTacGia";
import BookCategory from "./components/BookCategory";
import FavoriteScreen from "./components/FavoriteScreen";
import RateBook from "./components/RateBook";
import RegisterScreen from "./components/RegisterScreen";
import LoginScreen from "./components/LoginScreen";
import {checkVersion} from "./src/utils/version";
import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import mobileAds from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import {getProfile, saveFcmToken} from "./api/truyenApiAuth";
import RatingComment from "./components/RatingComment";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Library') iconName = focused ? 'library' : 'library-outline';
          else if (route.name === 'Explore') iconName = focused ? 'compass' : 'compass-outline';
          else if (route.name === 'Ranking') iconName = focused ? 'trophy' : 'trophy-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Account') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1e40af',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
      })}
    >
      <Tab.Screen name="Library" component={Library} options={{ title: 'Tủ truyện' }} />
      <Tab.Screen name="Explore" component={Home} options={{ title: 'Khám phá' }} />
      <Tab.Screen name="Search" component={Search} options={{ title: 'Tìm truyện' }} />
      <Tab.Screen name="Ranking" component={Ranking} options={{ title: 'Xếp hạng' }} />
      <Tab.Screen name="Account" component={Profile} options={{ title: 'Tài khoản' }} />
    </Tab.Navigator>
  );
}

// Ads Mở Ứng Dụng

const adUnitId = __DEV__
    ? TestIds.APP_OPEN
    : Platform.OS === 'ios'
        ? 'ca-app-pub-7354264038097352/9875309022'
        : 'ca-app-pub-7354264038097352/1788859460';

// thời gian chờ (ví dụ 10 phút)
const MIN_INTERVAL = 1 * 60 * 1000;



async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export default function App() {

    async function requestPer(){
        await requestUserPermission();

        await messaging().registerDeviceForRemoteMessages();
        console.log(1)
        const token =  await  messaging().getToken();
        console.log("tokenmessage", token)

        await saveFcmToken(Platform.OS , token);
    }

    useEffect(() => {
        PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS');
        requestPer()


        let adListener;

        const init = async () => {
            try {
                await getProfile();
                // 1. INIT ADMOB
                await mobileAds().initialize();
                console.log('AdMob initialized');

                // 2. CHECK VERSION
                const needUpdate = await checkVersion();
                if (needUpdate) return;

                // 3. CHECK TIME INTERVAL
                const lastShown = await AsyncStorage.getItem('last_ad_time');
                const now = Date.now();

                if (lastShown && now - parseInt(lastShown) < MIN_INTERVAL) {
                    console.log('Skip ad (too soon)');
                    return;
                }

                // 4. CREATE AD
                const ad = AppOpenAd.createForAdRequest(adUnitId);

                // 5. LISTENER
                adListener = ad.addAdEventListener(
                    AdEventType.LOADED,
                    async () => {
                        await ad.show();

                        await AsyncStorage.setItem(
                            'last_ad_time',
                            now.toString()
                        );
                    }
                );

                // 6. LOAD AD
                ad.load();

            } catch (err) {
                console.log('Ad error:', err);
            }
        };

        init();

        // CLEANUP
        return () => {
            if (adListener) {
                adListener();
            }
        };

    }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="MainTabs"
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#f1f5f9' }
              }}
            >
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="Detail" component={BookDetail} />
              <Stack.Screen name="Reading" component={Reading} />
              <Stack.Screen name="BookList" component={BookList} />
              <Stack.Screen name="BookTacGia" component={BookTacGia} />
              <Stack.Screen name="BookCategory" component={BookCategory} />
              <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
              <Stack.Screen name="RateBook" component={RateBook} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RatingComment" component={RatingComment} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
        <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1e293b',
  },
});
