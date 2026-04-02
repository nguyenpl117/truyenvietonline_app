import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HISTORY_DATA = [
  {
    id: '1',
    title: 'Mẹ Kế Ở Cổ Đại Làm Cá Mặn',
    chapter: '12',
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/me-ke-o-co-dai-lam-ca-man.webp',
  },
  {
    id: '2',
    title: 'All In Love',
    chapter: '5',
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/all-in-love.webp',
  },
];

const BOOKMARK_DATA = [
  {
    id: '3',
    title: 'Giới Hạn Si Mê',
    chapter: '1',
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/gioi-han-si-me-thoi-kinh-kinh.webp',
  },
];

export default function Library({ navigation }) {
  const [activeTab, setActiveTab] = useState('history'); // 'history' or 'bookmark'

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Detail', { book: item })}
    >
      <Image source={{ uri: item.cover }} style={styles.cover} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <View style={styles.progressRow}>
          <Ionicons name="book-outline" size={14} color="#64748b" />
          <Text style={styles.chapterText}>Đang đọc: Chương {item.chapter}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.moreBtn}>
        <Ionicons name="ellipsis-vertical" size={20} color="#94a3b8" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tủ truyện</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'history' && styles.activeTabItem]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>Lịch sử</Text>
        </TouchableOpacity>
        <View style={styles.tabDivider} />
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'bookmark' && styles.activeTabItem]}
          onPress={() => setActiveTab('bookmark')}
        >
          <Text style={[styles.tabText, activeTab === 'bookmark' && styles.activeTabText]}>Đánh dấu</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'history' ? HISTORY_DATA : BOOKMARK_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="library-outline" size={64} color="#e2e8f0" />
            <Text style={styles.emptyText}>Chưa có truyện nào trong danh sách</Text>
          </View>
        }
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
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTabItem: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94a3b8',
  },
  activeTabText: {
    color: '#1e40af',
  },
  tabDivider: {
    width: 1,
    height: 15,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 5,
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  cover: {
    width: 70,
    height: 100,
    borderRadius: 4,
    backgroundColor: '#f1f5f9',
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 5,
  },
  moreBtn: {
    padding: 10,
    justifyContent: 'center',
  },
  emptyState: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 15,
    color: '#94a3b8',
    fontSize: 16,
  },
});
