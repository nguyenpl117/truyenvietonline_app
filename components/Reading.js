import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Linking,
  Modal
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {getChapterDetail} from "../api/truyenApi";
import RenderHTML from "react-native-render-html";
import ChapterModal from './ChapterModal';
import HeaderLight from "./HeaderLight";
import {addViewedStory} from "./viewedStories";
const { width } = Dimensions.get('window');

export default function Reading({ route, navigation }) {

  const { book, chapter: initialChapter } = route.params;
  const [chapter, setChapter] = useState(initialChapter);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontSize, setFontSize] = useState(15);
  const [textColor, setTextColor] = useState('#000'); // mặc định đen

  const tagsStyles = {
    body: { color: textColor, fontSize: fontSize,   textAlign: 'justify',  },
    p: { marginVertical: 4, lineHeight: fontSize * 1.5 },
    em: { fontStyle: 'italic' },
    strong: { fontWeight: 'bold' },
    h1: { fontSize: fontSize * 1.4, fontWeight: 'bold' },
    h2: { fontSize: fontSize * 1.2, fontWeight: 'bold' },
    h3: { fontSize: fontSize * 1.1, fontWeight: 'bold' },
  };


  const scrollRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const scrollY = useRef(0);
  const intervalRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const openModal = (id) => {
    setVisible(true);  // mở modal
  };
  const autoScroll = () => {
    scrollY.current += 1;

    scrollRef.current?.scrollTo({
      y: scrollY.current,
      animated: false,
    });

    intervalRef.current = requestAnimationFrame(autoScroll);
  };

  const startAutoScroll = () => {
    if (intervalRef.current) return;

    intervalRef.current = requestAnimationFrame(autoScroll);
    setPlaying(true);
  };

  const stopAutoScroll = () => {
    cancelAnimationFrame(intervalRef.current);
    intervalRef.current = null;
    setPlaying(false);
  };

  const toggle = () => {
    if (playing) stopAutoScroll();
    else startAutoScroll();
  };



  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getChapterDetail(chapter.id); // make sure book.id exists
        if (book && data) {
          addViewedStory(book, data.id, data.chapter_number);
        }
        setDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [chapter.id]);

  if (loading) {
    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Đang tải truyện...</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderLight textTitle={book.title + ' - ' + detail.title} link={detail.link}/>
      <ScrollView showsVerticalScrollIndicator={false} onTouchStart={stopAutoScroll}  ref={scrollRef}
                  onScroll={(e) => {
                    scrollY.current = e.nativeEvent.contentOffset.y;
                  }}
                  scrollEventThrottle={16}>


        {/* Chapter Header Card */}
        <View style={styles.headerCard}>
          <Text style={styles.bookTitle}>{book.title.toUpperCase()}</Text>
          <Text style={styles.chapterNumber}>Chương {detail.chapter_number}</Text>
        </View>

        {/* Story Content */}
        <View style={styles.contentArea}>
          <RenderHTML
              contentWidth={width}
              source={{ html: detail.content.replace(/<p[^>]*>(\s|&nbsp;)*<\/p>/g, '').trim() }}
              tagsStyles={tagsStyles}
              renderersProps={{
                text: { selectable: true }
              }}
          />
        </View>
        
        <View style={{ height: 100 }} />
        <ChapterModal
            visible={visible}
            truyenId={book.id}
            onClose={() => setVisible(false)}

            onSelect={(chapters) => {
              setLoading(true)
              setChapter(chapters); // 🔥 cái này mới trigger useEffect
            }}
        />
      </ScrollView>



      {/* Bottom Navigation Fixed */}
      <View style={styles.bottomNav}>
        <View  style={styles.btnPreNext}>
          {
            detail.prev_chapter_id ? ( <TouchableOpacity style={styles.nextBtn} onPress={()=>{
              setLoading(true)
              setChapter({id: detail.prev_chapter_id});
            }}>
              <Ionicons name="chevron-back" size={22} color="#1e293b" />
            </TouchableOpacity>) : ''
          }

        </View>

        <View style={styles.centerBot}>
          <TouchableOpacity style={styles.navBtn}  onPress={toggle}>
            <Ionicons name={playing ? "pause" : "play"} size={22} color="#fff" style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.navBtn}
              onPress={() => openModal(book.id)} // 👉 ID truyện
          >
            <MaterialCommunityIcons name="format-list-bulleted" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View  style={styles.btnPreNext}>

          {
            detail.next_chapter_id ? ( <TouchableOpacity style={styles.nextBtn} onPress={()=>{
              setLoading(true)
              setChapter({id: detail.next_chapter_id});
            }}>
              <Ionicons name="chevron-forward" size={22} color="#1e293b" />
            </TouchableOpacity>) : ''
          }

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfbf7', // Slightly yellowish for comfortable reading
  },
  breadcrumbs: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  breadcrumbText: {
    fontSize: 13,
    color: '#1e40af',
    textDecorationLine: 'underline',
    flex: 1,
  },
  headerCard: {
    margin: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 8,
  },
  chapterNumber: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 10,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 14,
    color: '#475569',
    marginLeft: 5,
    fontWeight: '500',
  },
  contentArea: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  storyText: {
    fontSize: 18,
    lineHeight: 32,
    color: '#1e293b',
    textAlign: 'justify',
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  centerBot:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPreNext:{
    width: 34
  },
  navBtn: {
    width: 34,
    height: 34,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  nextBtn: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 5,
  },
});
