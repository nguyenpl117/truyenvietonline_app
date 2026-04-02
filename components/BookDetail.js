import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  'Bách Hợp', 'Cổ Đại', 'Cung Đấu', 'Dị Giới', 'Dị Năng', 'Gia Đấu', 'Hài Hước', 'Hệ Thống',
  'Huyền Huyễn', 'Huyền Nghi', 'Khoa Huyễn', 'Kiếm Hiệp', 'Kỳ Ảo', 'Lịch Sử', 'Linh Dị', 'Mạt Thế'
];

const TOP_BOOKS = [
  { id: '01', title: 'Anh Hoắc Ngoan Ngoãn Nuông Chiều Tôi', views: '4,116', color: '#ef4444' },
  { id: '02', title: 'Vạn Cổ Thần Đế', views: '3,911', color: '#10b981' },
  { id: '03', title: 'Thịnh Thế Hôn Nhân', views: '3,540', color: '#f59e0b' },
  { id: '04', title: 'Mê Vợ Không Lối Về', views: '3,052', color: '#3b82f6' },
  { id: '05', title: 'Vớt Thi Nhân', views: '2,361', color: '#6366f1' },
];

export default function BookDetail({ route, navigation }) {
  const { book } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Breadcrumbs */}
      <View style={styles.breadcrumbs}>
        <Ionicons name="home" size={14} color="#64748b" />
        <Ionicons name="chevron-forward" size={12} color="#94a3b8" style={{ marginHorizontal: 5 }} />
        <Text style={styles.breadcrumbText}>Cổ Đại</Text>
        <Ionicons name="chevron-forward" size={12} color="#94a3b8" style={{ marginHorizontal: 5 }} />
        <Text style={[styles.breadcrumbText, styles.breadcrumbActive]} numberOfLines={1}>{book.title}</Text>
      </View>

      <View style={styles.mainCard}>
        {/* Book Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.coverWrapper}>
            <Image source={{ uri: book.cover }} style={styles.cover} resizeMode="cover" />
            <View style={styles.coverShadow} />
          </View>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaRow}>
              <Ionicons name="person" size={14} color="#64748b" />
              <Text style={styles.metaText}>Minh Chi</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="folder-open" size={14} color="#64748b" />
              <Text style={styles.metaText}>Cổ Đại, Ngôn Tình, Trọng Sinh...</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="eye" size={14} color="#64748b" />
              <Text style={styles.metaText}>6,234 lượt xem</Text>
            </View>
          </View>

          <Text style={styles.title}>{book.title}</Text>
          
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <FontAwesome key={star} name="star" size={16} color="#fbbf24" style={{ marginRight: 2 }} />
            ))}
          </View>
          <Text style={styles.ratingText}>Đánh giá: <Text style={styles.ratingBold}>10/10</Text> từ <Text style={styles.ratingBold}>1 lượt</Text></Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.btnList}>
              <Text style={styles.btnText}>Danh sách chương</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFavorite}>
              <Text style={styles.btnText}>Truyện Yêu Thích</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nội dung truyện {book.title}</Text>
          </View>
          <Text style={styles.description} numberOfLines={6}>
            <Text style={styles.descBold}>{book.title}</Text> là một bộ truyện xuyên không cổ đại với nội dung nhẹ nhàng, hài hước xoay quanh nhân vật nữ chính <Text style={styles.descBold}>Ôn Diệp</Text>.{"\n\n"}
            Ở kiếp trước, Ôn Diệp là một nữ cường nhân nơi thương trường. Sau nhiều năm nỗ lực và cạnh tranh khốc liệt, cô mới vươn lên được vị trí tổng giám đốc của một công ty lớn...
          </Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Xem thêm...</Text>
          </TouchableOpacity>
        </View>

        {/* Latest Chapters */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderDark}>
            <MaterialCommunityIcons name="format-list-bulleted" size={18} color="#fff" />
            <Text style={styles.sectionTitleLight}>CHƯƠNG MỚI NHẤT</Text>
          </View>
          {[355, 354, 353, 352].map((ch) => (
            <TouchableOpacity 
              key={ch} 
              style={styles.chapterItem}
              onPress={() => navigation.navigate('Reading', { book, chapter: ch })}
            >
              <Text style={styles.chapterText}>Chương {ch}{ch === 355 ? ': Toàn Văn Hoàn' : ''}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Full Chapter List */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderDark}>
            <MaterialCommunityIcons name="format-list-bulleted" size={18} color="#fff" />
            <Text style={styles.sectionTitleLight}>DANH SÁCH CHƯƠNG</Text>
          </View>
          {[1, 2, 3, 4].map((ch) => (
            <TouchableOpacity 
              key={ch} 
              style={styles.chapterItem}
              onPress={() => navigation.navigate('Reading', { book, chapter: ch })}
            >
              <Text style={styles.chapterText}>Chương {ch}</Text>
            </TouchableOpacity>
          ))}
          {/* Simple Pagination */}
          <View style={styles.pagination}>
            <View style={[styles.pageDot, styles.pageActive]}><Text style={styles.pageTextActive}>1</Text></View>
            <View style={styles.pageDot}><Text style={styles.pageText}>2</Text></View>
            <View style={styles.pageDot}><Text style={styles.pageText}>3</Text></View>
            <View style={styles.pageDot}><Text style={styles.pageText}>...</Text></View>
            <View style={styles.pageDot}><Text style={styles.pageText}>{'>'}</Text></View>
          </View>
        </View>
      </View>

      {/* Categories Grid */}
      <View style={styles.sidebarSection}>
        <View style={styles.sectionHeaderDark}>
          <Text style={styles.sectionTitleLight}>THỂ LOẠI TRUYỆN</Text>
        </View>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat} style={styles.categoryItem}>
              <Ionicons name="pricetag" size={12} color="#1e40af" style={{ marginRight: 5 }} />
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Top Books */}
      <View style={styles.sidebarSection}>
        <View style={styles.sectionHeaderDark}>
          <Text style={styles.sectionTitleLight}>TOP TRUYỆN HAY</Text>
        </View>
        <View style={styles.topBooksList}>
          {TOP_BOOKS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.topBookItem}>
              <Text style={[styles.rankText, { color: item.color }]}>{item.id}</Text>
              <View style={styles.topBookInfo}>
                <Text style={styles.topBookTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.viewCountRow}>
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
      </View>
      
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cbd5e1', // Darker gray for the background contrast
  },
  breadcrumbs: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8fafc',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  breadcrumbText: {
    fontSize: 13,
    color: '#64748b',
  },
  breadcrumbActive: {
    color: '#1e40af',
    fontWeight: '500',
    flex: 1,
  },
  mainCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  coverWrapper: {
    width: 220,
    height: 310,
    marginBottom: 20,
    position: 'relative',
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    zIndex: 2,
  },
  coverShadow: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    transform: [{ scale: 1.02 }],
  },
  metaInfo: {
    width: '100%',
    marginBottom: 15,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  metaText: {
    fontSize: 14,
    color: '#1e40af',
    marginLeft: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#334155',
  },
  ratingBold: {
    fontWeight: '800',
    fontStyle: 'italic',
  },
  actionButtons: {
    width: '100%',
    marginTop: 20,
  },
  btnList: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnFavorite: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  section: {
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 20,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#475569',
  },
  descBold: {
    fontWeight: '700',
    color: '#1e293b',
  },
  readMore: {
    color: '#1e40af',
    fontWeight: '600',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  sectionHeaderDark: {
    backgroundColor: '#334155',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 1,
  },
  sectionTitleLight: {
    color: '#fff',
    fontWeight: '800',
    marginLeft: 8,
    fontSize: 15,
  },
  chapterItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: '#f8fafc',
  },
  chapterText: {
    color: '#2563eb',
    fontSize: 15,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pageDot: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  pageActive: {
    backgroundColor: '#334155',
    borderColor: '#334155',
  },
  pageText: {
    color: '#64748b',
  },
  pageTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  sidebarSection: {
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
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
    paddingVertical: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '500',
  },
  topBooksList: {
    padding: 10,
  },
  topBookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rankText: {
    fontSize: 24,
    fontWeight: '700',
    width: 40,
    textAlign: 'center',
  },
  topBookInfo: {
    flex: 1,
    marginLeft: 10,
  },
  topBookTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  viewCountRow: {
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
    marginTop: 15,
  },
  seeMoreText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 5,
  },
});
