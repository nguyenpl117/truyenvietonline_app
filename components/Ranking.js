import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {getChapterDetail, getTopTruyen, searchTruyen} from "../api/truyenApi";
import {addViewedStory} from "./viewedStories";

const RANK_TABS = [
  { id: 'views', title: 'Lượt đọc' },
  // { id: 'nominations', title: 'Đề cử' },
  // { id: 'comments', title: 'Bình luận' },
  // { id: 'unlock', title: 'Mở khóa' },
  // { id: 'rewards', title: 'Tặng thưởng' },
];

const COLOR = ['#ef4444', '#10b981', '#f59e0b']

export default function Ranking({ navigation }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('views');
  const fetchTopTruyen = async () => {
    try {
      setLoading(true);
      const res = await getTopTruyen();
      console.log(res)

      const newData = res || [];
      setResults(newData);

    } catch (error) {
      console.log('Search error:', error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTopTruyen()
  }, []);

  const getData = (id) =>{
    setActiveTab(id);
    if(id == 'views'){
      fetchTopTruyen()
    }
  }



  const renderStars = (rating, views) => {
    return (
        <View style={styles.starRow}>
          <Ionicons name="star" size={12} color="#f59e0b" />
          <Text style={styles.ratingText}>{rating}/10</Text>
          <Ionicons name="eye" size={12} color="#f59e0b" style={{marginLeft: 10}}/>
          <Text style={styles.ratingText}>{views}</Text>
        </View>
    );
  };

  const renderItem = ({ item,index }) => (
      <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Detail', { book: item })}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.cover} resizeMode="cover" />

        <View style={styles.info}>
          <View style={styles.titleRow}>
            <View style={[styles.rankBadge, { backgroundColor: index  < 3 ? COLOR[index ] : '#999' }]}>
              <Text style={styles.rankBadgeText}>{index+1 }</Text>
            </View>
            <Text style={styles.title} numberOfLines={1}>{item.tieu_de}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="person-outline" size={12} color="#64748b" />
            <Text style={styles.authorText} numberOfLines={1}>{item.tac_gia[0].name}</Text>
          </View>
          <View style={styles.bottomMeta}>
            {renderStars(item.avg, item.views)}

            <View style={styles.chapterTag}>
              <Text style={styles.chapterTagText}>{item.tong_so_chuong} chương</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Xếp hạng</Text>
      </View>

      <View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.tabBar}
          contentContainerStyle={styles.tabBarContent}
        >
          {RANK_TABS.map((tab) => (
            <TouchableOpacity 
              key={tab.id}
              style={[styles.tabItem, activeTab === tab.id && styles.activeTabItem]}
              onPress={() => getData(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() + '_' + index}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  tabBar: {
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
  },
  tabBarContent: {
    paddingHorizontal: 15,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  activeTabItem: {
    backgroundColor: '#1e40af',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#fff',
  },
  listContent: {
    padding: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12,
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rankBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  cover: {
    width: 60,
    height: 85,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  authorText: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 4,
  },
  bottomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginLeft: 3,
  },
  chapterTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  chapterTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
});
