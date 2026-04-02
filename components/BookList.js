import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_DATA = [
  {
    id: '1',
    rank: 1,
    title: 'Kiếm Lai',
    author: 'Phong Hỏa Hí Chư Hầu',
    rating: 4.8,
    chapters: 1200,
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/me-ke-o-co-dai-lam-ca-man.webp',
    color: '#ef4444',
  },
  {
    id: '2',
    rank: 2,
    title: 'Nghịch Thiên Tà Thần',
    author: 'Hỏa Tinh Dẫn Lực',
    rating: 4.7,
    chapters: 1800,
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/all-in-love.webp',
    color: '#10b981',
  },
  {
    id: '3',
    rank: 3,
    title: 'Đấu La Đại Lục',
    author: 'Đường Gia Tam Thiếu',
    rating: 4.9,
    chapters: 900,
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/gioi-han-si-me-thoi-kinh-kinh.webp',
    color: '#f59e0b',
  },
];

export default function BookList({ route, navigation }) {
  const { category } = route.params;

  const renderStars = (rating) => (
    <View style={styles.starRow}>
      <Ionicons name="star" size={12} color="#f59e0b" />
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
      </View>

      <FlatList
        data={MOCK_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  backBtn: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
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
