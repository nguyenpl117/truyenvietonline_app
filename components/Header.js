import React from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://truyenvietonline.com/wp-content/themes/truyenviet/assets/images/logo-truyen-viet-online.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {/*<View style={styles.searchBar}>*/}
      {/*  <TextInput*/}
      {/*    placeholder="Tìm kiếm..."*/}
      {/*    style={styles.input}*/}
      {/*    placeholderTextColor="#999"*/}
      {/*  />*/}
      {/*  <TouchableOpacity style={styles.searchButton}>*/}
      {/*    <Ionicons name="search" size={20} color="#666" />*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    // backgroundColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15, // For status bar compensation
    // borderBottomWidth: 1,
    // borderBottomColor: '#334155',
    justifyContent: 'center'
  },
  logoContainer: {
    // flex: 1,
  },
  logo: {
    width: 100,
    height: 30,
  },
  searchBar: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 36,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    padding: 5,
  },
});
