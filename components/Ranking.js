import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RANK_TABS = [
  { id: 'views', title: 'Lượt đọc' },
  { id: 'nominations', title: 'Đề cử' },
  { id: 'comments', title: 'Bình luận' },
  { id: 'unlock', title: 'Mở khóa' },
  { id: 'rewards', title: 'Tặng thưởng' },
];

const RANKING_DATA = [
  {
    id: '1',
    rank: 1,
    title: 'Kiếm Lai',
    author: 'Phong Hỏa Hí Chư Hầu',
    rating: 4.8,
    chapters: 1200,
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/me-ke-o-co-dai-lam-ca-man.webp', // Placeholder
    color: '#ef4444',
  },
  {
    id: '2',
    rank: 2,
    title: 'Nghịch Thiên Tà Thần',
    author: 'Hỏa Tinh Dẫn Lực',
    rating: 4.7,
    chapters: 1800,
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/all-in-love.webp', // Placeholder
    color: '#10b981',
  },
  {
    id: '3',
    rank: 3,
    title: 'Đấu La Đại Lục',
    author: 'Đường Gia Tam Thiếu',
    rating: 4.9,
    chapters: 900,
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/gioi-han-si-me-thoi-kinh-kinh.webp', // Placeholder
    color: '#f59e0b',
  },
  {
    id: '4',
    rank: 4,
    title: 'Phàm Nhân Tu Tiên',
    author: 'Vong Ngữ',
    rating: 4.6,
    chapters: 2400,
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/xin-em-dung-khoc.webp', // Placeholder
    color: '#3b82f6',
  },
];

export default function Ranking({ navigation }) {
  const [activeTab, setActiveTab] = useState('views');

  const renderStars = (rating) => {
    return (
      <View style={styles.starRow}>
        <Ionicons name="star" size={12} color="#f59e0b" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Detail', { book: item })}
    >
      <Image source={{ uri: item.cover }} style={styles.cover} resizeMode="cover" />
      
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <View style={[styles.rankBadge, { backgroundColor: item.color }]}>
            <Text style={styles.rankBadgeText}>{item.rank}</Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="person-outline" size={12} color="#64748b" />
          <Text style={styles.authorText} numberOfLines={1}>{item.author}</Text>
        </View>
        <View style={styles.bottomMeta}>
          {renderStars(item.rating)}
          <View style={styles.chapterTag}>
            <Text style={styles.chapterTagText}>{item.chapters} chương</Text>
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
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={RANKING_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
