import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 3; // 2 columns with padding

export default function BookCard({ book }) {
  return (
    <View style={styles.container} activeOpacity={0.8}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: book.thumbnail }}
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.domain}>truyenvietonline.com</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.chapter}>Chương {book.tong_so_chuong}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 0,
    // backgroundColor: '#fff',
    // borderRadius: 8,
    overflow: 'hidden',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  imageWrapper: {
    width: '100%',
    height: 160,
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden'
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  domain: {
    color: '#fff',
    fontSize: 8,
    opacity: 0.8,
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    lineHeight: 18,
  },
  chapter: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
});
