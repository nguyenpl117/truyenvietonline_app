import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';
import Home from './components/Home';
import BookDetail from './components/BookDetail';
import Reading from './components/Reading';
import Library from './components/Library';
import Ranking from './components/Ranking';
import Profile from './components/Profile';
import BookList from './components/BookList';

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
      <Tab.Screen name="Ranking" component={Ranking} options={{ title: 'Xếp hạng' }} />
      <Tab.Screen name="Account" component={Profile} options={{ title: 'Tài khoản' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Header />
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
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
});
