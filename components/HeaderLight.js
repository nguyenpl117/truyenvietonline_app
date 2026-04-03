import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function HeaderLight({ textTitle, link }) {

  const navigation = useNavigation(); // ✅ hook để lấy navigation

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Xem truyện ${textTitle}: ${link}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color="#0f172a" />
      </TouchableOpacity>
      <Text style={styles.txtLinearHeader} numberOfLines={1}>
        {textTitle}
      </Text>
      <TouchableOpacity style={styles.btnBack} onPress={onShare}>
        <Ionicons name="share-social" size={25} color="#0f172a" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  txtLinearHeader:{
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 18,
    flex: 8,
    marginRight: 10,
    marginLeft:10
  },
  btnBack:{
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 60,
    // backgroundColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20, // For status bar compensation
    // borderBottomWidth: 1,
    // borderBottomColor: '#334155',
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
