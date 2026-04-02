import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BookCard from './BookCard';

const { width } = Dimensions.get('window');

const BOOKS = [
  {
    id: '1',
    title: 'Mẹ Kế Ở Cổ Đại Làm Cá Mặn',
    chapter: '355',
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/me-ke-o-co-dai-lam-ca-man.webp',
  },
  {
    id: '2',
    title: 'All In Love',
    chapter: '27',
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/all-in-love.webp',
  },
  {
    id: '3',
    title: 'Giới Hạn Si Mê',
    chapter: '304',
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/gioi-han-si-me-thoi-kinh-kinh.webp',
  },
  {
    id: '4',
    title: 'Xin Em Đừng Khóc!',
    chapter: '65',
    cover: 'https://truyenvietonline.com/wp-content/uploads/2026/03/xin-em-dung-khoc.webp',
  },
];

const UPDATED_STORIES = [
  { id: '1', title: 'Chí Tôn', time: '9 giờ trước' },
  { id: '2', title: 'Nghịch Thủy Hàn', time: '9 giờ trước' },
  { id: '3', title: 'Vô Địch Thiên Hạ', time: '9 giờ trước' },
  { id: '4', title: 'Võ Đạo Đại Tông Sư', time: '9 giờ trước' },
  { id: '5', title: 'Dụ Dỗ Tiểu Hồ Ly', time: '9 giờ trước' },
];

const CATEGORIES = [
  'Cổ Đại', 'Dị Giới', 'Dị Năng', 'Hài Hước', 'Hệ Thống', 'Huyền Huyễn', 'Huyền Nghi', 'Khoa Huyễn',
  'Kiếm Hiệp', 'Kỳ Ảo', 'Linh Dị', 'Ngôn Tình', 'Truyện Tranh', 'Xuyên Không', 'Xuyên Nhanh', 'Đam Mỹ',
  'Điền Văn', 'Đô Thị', 'Đông Phương'
];

const TOP_BOOKS = [
  { id: '01', title: 'Kiếm Lai', views: '18', color: '#ef4444' },
  { id: '02', title: 'Thiên Đóa Đào Hoa Nhất Thế Khai', views: '12', color: '#10b981' },
  { id: '03', title: 'Biểu Muội Khó Chiều – Kim Mộc Lý', views: '380', color: '#f59e0b' },
  { id: '04', title: 'Vưu Vật', views: '46', color: '#3b82f6' },
  { id: '05', title: 'Sủng Vật Hay Món Đồ Chơi', views: '3', color: '#6366f1' },
];

export default function Home({ navigation }) {
  const renderBookSection = (title, data, backgroundColor) => (
    <View style={[styles.section, { backgroundColor }]}>
      <TouchableOpacity
        style={styles.categoryHeader}
        onPress={() => navigation.navigate('BookList', { category: title })}
        activeOpacity={0.7}
      >
        <Text style={styles.categoryTitle}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#000000ff" />
      </TouchableOpacity>
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
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderBookSection('NGÔN TÌNH', BOOKS, '#f1f5f9')}
      {renderBookSection('TIÊN HIỆP', BOOKS.slice(0, 2), '#fff')}
      {renderBookSection('XUYÊN KHÔNG', BOOKS.slice(2, 4), '#f1f5f9')}

      {/* RECENT UPDATES */}
      <View style={styles.footerBlock}>
        <View style={styles.footerHeader}>
          <Text style={styles.footerHeaderText}>TRUYỆN CẬP NHẬT MỚI NHẤT</Text>
        </View>
        {UPDATED_STORIES.map((item) => (
          <TouchableOpacity key={item.id} style={styles.updatedItem}>
            <Text style={styles.updatedTitle}>{item.title}</Text>
            <Text style={styles.updatedTime}>Đang Ra {item.time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CATEGORIES GRID */}
      <View style={styles.footerBlock}>
        <View style={styles.footerHeader}>
          <Text style={styles.footerHeaderText}>THỂ LOẠI TRUYỆN</Text>
        </View>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat} style={styles.categoryItem}>
              <Ionicons name="pricetag" size={14} color="#1e40af" style={{ marginRight: 8 }} />
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* TOP BOOKS */}
      <View style={styles.footerBlock}>
        <View style={styles.footerHeader}>
          <Text style={styles.footerHeaderText}>TOP TRUYỆN HAY</Text>
        </View>
        {TOP_BOOKS.map((item) => (
          <TouchableOpacity key={item.id} style={styles.topItem}>
            <Text style={[styles.rankText, { color: item.color }]}>{item.id}</Text>
            <View style={styles.topInfo}>
              <Text style={styles.topTitle} numberOfLines={1}>{item.title}</Text>
              <View style={styles.viewRow}>
                <Ionicons name="eye" size={12} color="#94a3b8" />
                <Text style={styles.viewCount}>{item.views}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.btnSeeMore}>
          <Text style={styles.seeMoreText}>Xem thêm</Text>
          <Ionicons name="chevron-down" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* COPYRIGHT FOOTER */}
      <View style={styles.copyrightFooter}>
        <Text style={styles.copyrightText}>
          Website TruyệnViệtOnline - là trang đọc truyện chữ online hàng đầu Việt Nam với nhiều thể loại truyện đam mỹ, truyện ngôn tình, truyện sắc chọn lọc dành cho độc giả yêu thích.
        </Text>
        <Text style={styles.copyrightText}>
          Copyright © truyenvietonline.com. All Rights Reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingTop: 20,
    paddingBottom: 10,
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
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
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
    color: '#1e293b',
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
    color: '#1e293b',
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
