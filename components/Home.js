import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookCard from './BookCard';
import Header from "./Header";
import SelectTheLoaiDropdown from "./SelectTheLoai";
import {getTheLoai, getTheLoaiDetail} from "../api/truyenApi";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');


export default function Home({ navigation }) {

  const [theloai, setTheLoai] = useState([]);
  const [theloaiSelect, setTheloaiSelect] = useState({});


  const renderBookSection = (title, data, backgroundColor) => (
    <View style={[styles.section, { backgroundColor }]}>
      <TouchableOpacity
        style={styles.categoryHeader}
        onPress={() => navigation.navigate('BookCategory', {category: {id: theloaiSelect.value, name: theloaiSelect.label}})}
        activeOpacity={0.7}
      >
        <Text style={styles.categoryTitle}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#000000ff" />
      </TouchableOpacity>
      <ScrollView >
        <View style={styles.grid}>
            {data.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate('Detail', { book: item })}
                activeOpacity={0.8}
              >
                <BookCard book={item} />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );

  const fetchTheLoaiDetail = async (data) => {
    if(data && !data.value) return;
    try {
      setTheloaiSelect(data)
      const obj = await getTheLoaiDetail(data.value);
      setTheLoai(obj);
    } catch (err) {
    } finally {
    }
  };

  return (

      <View style={styles.container}>
        <Header />

        <ScrollView style={styles.container} nestedScrollEnabled={true}>
          {/*<View style={styles.boxTop}>*/}
          {/*  <TouchableOpacity style={styles.itemTop}>*/}
          {/*    <Ionicons name="star-sharp" size={22} color="#1e40af" />*/}
          {/*    <Text style={styles.itemTopText}>Đánh Giá</Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <TouchableOpacity style={styles.itemTop}>*/}
          {/*    <Ionicons name="heart" size={22} color="#1e40af" />*/}
          {/*    <Text style={styles.itemTopText}>Yêu Thích</Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <TouchableOpacity style={styles.itemTop}>*/}
          {/*    <Ionicons name="stats-chart-outline" size={22} color="#1e40af" />*/}
          {/*    <Text style={styles.itemTopText}>Xem Nhiều</Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <TouchableOpacity style={styles.itemTop}>*/}
          {/*    <Ionicons name="pulse-outline" size={22} color="#1e40af" />*/}
          {/*    <Text  style={styles.itemTopText}>Thịnh Hành</Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
          <View>
            <SelectTheLoaiDropdown onChange={(termId) => fetchTheLoaiDetail(termId)} />
          </View>
          {theloai && renderBookSection(theloaiSelect.label, theloai, '#f1f5f9')}

        </ScrollView>
      </View>

  );
}

const styles = StyleSheet.create({
  boxTop:{
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15
  },
  itemTop:{
    borderRadius: 4,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
    width: '23%',
    paddingVertical: 12
  },
  itemTopText:{
    fontSize: 12,
    marginTop: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingTop: 10,
    paddingBottom: 0,
  },
  categoryHeader: {
    paddingVertical: 12,
    marginBottom: 5,
    marginHorizontal: 15,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 7,
    flexWrap: 'wrap'
  },
  footerBlock: {
    margin: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  footerHeader: {
    backgroundColor: '#334155',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  footerHeaderText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  updatedItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  updatedTitle: {
    fontSize: 16,
    color: '#1e40af',
    fontWeight: '600',
    marginBottom: 4,
  },
  updatedTime: {
    fontSize: 14,
    color: '#64748b',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  categoryItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '500',
  },
  topItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rankText: {
    fontSize: 24,
    fontWeight: '700',
    width: 40,
    textAlign: 'center',
  },
  topInfo: {
    flex: 1,
    marginLeft: 10,
  },
  topTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 2,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCount: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 4,
  },
  btnSeeMore: {
    backgroundColor: '#64748b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    width: 120,
    alignSelf: 'center',
    marginVertical: 15,
  },
  seeMoreText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 5,
  },
  copyrightFooter: {
    backgroundColor: '#334155',
    padding: 25,
    alignItems: 'center',
  },
  copyrightText: {
    color: '#cbd5e1',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
});
