import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Reading({ route, navigation }) {
  const { book, chapter } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Breadcrumbs */}
        <View style={styles.breadcrumbs}>
          <Ionicons name="home" size={14} color="#1e40af" />
          <Ionicons name="chevron-forward" size={12} color="#94a3b8" style={{ marginHorizontal: 5 }} />
          <Text style={styles.breadcrumbText}>Cổ Đại, Ngôn Tình, Trọng Sinh, Xuyên Không, Điền Văn</Text>
          <Ionicons name="chevron-forward" size={12} color="#94a3b8" style={{ marginHorizontal: 5 }} />
        </View>

        {/* Chapter Header Card */}
        <View style={styles.headerCard}>
          <Text style={styles.bookTitle}>{book.title.toUpperCase()}</Text>
          <Text style={styles.chapterNumber}>Chương {chapter}</Text>
          <View style={styles.authorRow}>
            <Ionicons name="person" size={14} color="#475569" />
            <Text style={styles.authorName}>Minh Chi</Text>
          </View>
        </View>

        {/* Story Content */}
        <View style={styles.contentArea}>
          <Text style={styles.storyText}>
            Năm Cảnh Nguyên thứ ba, mùa hoa đào hoa mận đua nhau khoe sắc, trong Thịnh Kinh đô thành, nhà Thái Thường Tự Khanh Ôn gia từ trên xuống dưới tràn ngập bầu không khí vui sướng.{"\n\n"}
            Hôm nay là ngày đại hôn của con trai thứ Ôn gia, giờ phút này tân nương đã được nghênh vào phủ.{"\n\n"}
            Trong gian phòng tân hôn, nến đỏ cháy rực, ánh sáng lung linh hắt lên khuôn mặt e lệ của thiếu nữ đang ngồi bên mép giường.{"\n\n"}
            Ôn Diệp cảm thấy đầu mình hơi choáng váng, nàng khẽ cử động, cảm nhận được sức nặng của đống trang sức trên đầu. Nàng nhớ lại những chuyện đã xảy ra, lòng không khỏi thở dài.{"\n\n"}
            Kiếp trước nàng là một nữ cường nhân, không ngờ sau khi chết đi lại xuyên không về nơi này, trở thành một tiểu thư khuê các...{"\n\n"}
            (Nội dung tiếp tục...)
          </Text>
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation Fixed */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navBtn}>
          <Ionicons name="play" size={24} color="#fff" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextBtn}>
          <Text style={styles.nextBtnText}>Sau</Text>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>
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
    padding: 20,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(51, 65, 85, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  navBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  nextBtn: {
    backgroundColor: '#1e293b',
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
});
