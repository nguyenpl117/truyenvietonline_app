import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderLight from "./HeaderLight";
import {categoryTruyen} from "../api/truyenApi";

const COLOR = ['#ef4444', '#10b981', '#f59e0b']
export default function BookCategory({ route, navigation }) {
  const { category } = route.params;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // còn data không


  // call API khi có keyword
  useEffect(() => {
    if (!category.id) {
      setResults([]);
      return;
    }
    fetchCategory(category.id, 1);
  }, [category.id]);

  const fetchCategory = async (categoryID, page = 1) => {
    try {
      if (!categoryID) return;

      setLoading(true);

      const res = await categoryTruyen(categoryID, page);

      const newData = res.data || [];

      if (page === 1) {
        setResults(newData);
      } else {
        setResults(prev => [...prev, ...newData]);
      }

      // 🔥 check còn data không
      if (newData.length === 0) {
        setHasMore(false);
      }

    } catch (error) {
      console.log('Search error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchCategory(category.id, nextPage);
  };

  const renderStars = (rating, views) => (
      <View style={styles.starRow}>
        <Ionicons name="star" size={12} color="#f59e0b" />
        <Text style={styles.ratingText}>{rating}/10</Text>
        <Ionicons name="eye" size={12} color="#f59e0b" style={{marginLeft: 10}}/>
        <Text style={styles.ratingText}>{views}</Text>
      </View>
  );

  const renderItem = ({item, index }) => (
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
      <SafeAreaView style={styles.container}>
        <HeaderLight textTitle={'Thể Loại: '+category.name} link={''} />

        <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id.toString() + '_' + index}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5} // cuộn gần cuối là load
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
    fontSize: 18,
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
