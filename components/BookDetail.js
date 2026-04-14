import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  Pressable,
  LayoutAnimation
} from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderLight from "./HeaderLight";
import {getTruyenDetail} from "../api/truyenApi";
import RenderHTML from 'react-native-render-html';
import ChapterModal from "./ChapterModal";


const { width } = Dimensions.get('window');


export default function BookDetail({ route, navigation }) {
  const { book } = route.params;
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontSize, setFontSize] = useState(15);
  const [textColor, setTextColor] = useState('#000'); // mặc định đen
  const [visible, setVisible] = useState(false);

  const openModal = (id) => {
    setVisible(true);  // mở modal
  };
  const tagsStyles = {
    body: { color: textColor, fontSize: fontSize,   textAlign: 'justify',  },
    p: { marginVertical: 4, lineHeight: fontSize * 1.5 },
    em: { fontStyle: 'italic' },
    strong: { fontWeight: 'bold' },
    h1: { fontSize: fontSize * 1.4, fontWeight: 'bold' },
    h2: { fontSize: fontSize * 1.1, fontWeight: 'bold' },
    h3: { fontSize: fontSize * 1.1, fontWeight: 'bold' },
  };


  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getTruyenDetail(book.id); // make sure book.id exists
        setDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [book.id]);

  if (loading) {
    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Loading...</Text>
        </View>
    );
  }
  return (
      <View style={styles.container}>
        <HeaderLight textTitle={detail.title} link={detail.link}/>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.mainCard}>
            {/* Book Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.boxImage}>
                <View style={styles.metaInfo}>
                  <View style={styles.metaRow}>
                    <Ionicons name="person" size={14} color="#64748b" />
                    <View style={styles.metaTextWrap}>
                      {detail.tac_gia.map((tg, index) => (
                          <React.Fragment key={tg.id}>
                            <Pressable onPress={() =>   navigation.navigate('BookTacGia', { author: tg })}>
                              <Text style={styles.metaText}>{tg.name} {index < detail.tac_gia.length - 1 && ',' }</Text>
                            </Pressable>
                          </React.Fragment>
                      ))}

                    </View>
                  </View>
                  <View style={styles.metaRow}>
                    <Ionicons name="cloud-done-outline" size={14} color="#64748b" />
                    <Text style={styles.metaText}>{detail.status}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Ionicons name="eye" size={14} color="#64748b" />
                    <Text style={styles.metaText}>{detail.views} lượt xem</Text>
                  </View>

                  <View style={styles.ratingRow}>
                    {[1,2,3,4,5,6,7,8,9,10].map((star) => (
                        <FontAwesome
                            key={star}
                            name="star"
                            size={16}
                            color={star <= detail.avg ? "#fbbf24" : "#d1d5db"} // vàng : xám
                            style={{ marginRight: 2 }}
                        />
                    ))}
                  </View>
                  {detail.count ? (
                      <Text style={styles.ratingText}>
                        Đánh giá:
                        <Text style={styles.ratingBold}> {detail.avg}/10</Text>
                        từ
                        <Text style={styles.ratingBold}> {detail.count} lượt</Text>
                      </Text>
                  ) : (
                      <Text style={styles.ratingText}>Chưa có đánh giá</Text>
                  )}

                </View>

                <View style={styles.coverWrapper}>
                  <Image source={{ uri: detail.thumbnail }} style={styles.cover} resizeMode="cover" />
                  <View style={styles.coverShadow} />
                </View>
              </View>

              <View style={styles.metaTextWrap}>
                {detail.the_loai.map((tg, index) => (
                    <React.Fragment key={tg.id}>
                      <Pressable onPress={() =>  navigation.navigate('BookCategory', { category: tg })}>
                        <Text style={styles.metaTextTag}>{tg.name}</Text>
                      </Pressable>
                    </React.Fragment>
                ))}
              </View>

              {/* Latest Chapters */}
              <Text style={styles.sectionTitleLight}>CHƯƠNG MỚI NHẤT</Text>
              <View style={styles.listChapter}>

                {detail.last_chuong.map((chapter) => (
                    <TouchableOpacity
                        key={chapter.id}
                        style={styles.chapterItem}
                        onPress={() => navigation.navigate('Reading', { book: detail, chapter })}
                    >
                      <Text style={styles.chapterText}>{chapter.chuong_so}</Text>
                    </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.title}>{detail.title}</Text>


              {/* Action Buttons */}
              <View style={styles.boxAction}>
                <TouchableOpacity style={styles.itemAction}>
                  <Ionicons name="heart-outline" size={18} color="#01a3d0" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemAction}>
                  <Ionicons name="chatbubble-ellipses-outline" size={18} color="#01a3d0" />
                </TouchableOpacity>
              </View>

            </View>

            {/* Description Section */}
            <View style={styles.section}>
              <View
                  style={{ maxHeight: expanded ? undefined : 24 * 6, overflow: 'hidden' }}
              >
                <Text>
                  <RenderHTML
                      contentWidth={width}
                      source={{ html: detail.content }}
                      tagsStyles={tagsStyles}
                      renderersProps={{
                        text: { selectable: true }
                      }}
                  />
                </Text>

              </View>

              <TouchableOpacity
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setExpanded(!expanded);
                  }}
              >
                <Text style={styles.readMore}>
                  {expanded ? '...Thu gọn' : 'Xem thêm...'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

        <View style={styles.bottomBox}>
          <TouchableOpacity style={styles.listBtn}>
            <Ionicons name="cloud-download-outline" size={18} color="#64748b" />
            <Text style={styles.listBtnText}>Tải Về</Text>
          </TouchableOpacity>


          <TouchableOpacity
              onPress={() => {
                navigation.navigate('Reading', { book: detail, chapter: {id: '000000'} })
              }}
          >
            <Text style={styles.readBtn}>
              Đọc Truyện
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listBtn}   onPress={() => openModal(detail.id)} >
            <Ionicons name="list-outline" size={18} color="#64748b" />
            <Text style={styles.listBtnText}>Mục Lục</Text>
          </TouchableOpacity>
        </View>


        <ChapterModal
            visible={visible}
            truyenId={detail.id}
            onClose={() => setVisible(false)}

            onSelect={(chapters) => {
              navigation.navigate('Reading', { book: detail, chapter: chapters })
            }}
        />

      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#cbd5e1', // Darker gray for the background contrast
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
  boxImage:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 25,

  },
  coverWrapper: {
    width: '20%',
    minWidth: 80,
    height: 120,
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
    bottom: -5,
    right: -5,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    transform: [{ scale: 1.02 }],
  },
  metaInfo: {
    width: '72%',
    marginBottom: 15,
    marginRight: '5%'
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  metaText: {
    fontSize: 14,
    color: '#01a3d0',
    marginLeft: 8,
  },
  metaTextWrap: {
    width: '100%',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'flex-start',
  },
  metaTextTag:{
    fontSize: 12,
    color: '#333',
    backgroundColor: '#efefef',
    borderRadius: 20,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 5,
    marginBottom: 5
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
    marginTop: 10
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
    color: '#01a3d0',
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
  listChapter:{
    width: '100%',
    flexDirection: "row"
  },
  sectionTitleLight: {
    width: '100%',
    marginTop: 15,
    fontSize: 15,
    marginBottom: 5
  },
  chapterItem: {
    flexDirection: "row"
  },
  chapterText: {
    fontSize: 12,
    color: '#333',
    backgroundColor: '#efefef',
    borderRadius: 20,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 5
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
    color: '#01a3d0',
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

  bottomBox:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',

    // thêm shadow cho đẹp (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android
    elevation: 10,
  },
  readBtn:{
    borderColor: '#01a3d0',
    padding: 4,
    paddingRight: 22,
    paddingLeft: 22,
    borderRadius: 20,
    color:  '#01a3d0',
    borderWidth: 1,
    fontSize: 17,
    fontWeight: 500
  },
  listBtn:{
    textAlign: 'center',
    alignItems: 'center'
  },
  listBtnText:{
    color:  '#01a3d0',
    fontSize: 14,
    marginTop: 3
  },
  boxAction:{
    flexDirection: "row",
    gap: 8,
  },
  itemAction:{
    borderColor: "#01a3d0",
    borderWidth: 1,
    borderRadius: '50%',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
