import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Keyboard,
    StyleSheet, ScrollView, Platform, FlatList, InteractionManager
} from 'react-native';
import HeaderLight from "./HeaderLight";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";
import CommentItem from "./CommentItem";
import {submitRating} from "../api/truyenApiAuth";
import Toast from 'react-native-toast-message';
import {getStoryRatings} from "../api/truyenApi";


const adUnitIdBanner = __DEV__
    ? TestIds.BANNER
    : Platform.OS === 'ios'
        ? 'ca-app-pub-7354264038097352/4880026850'
        : 'ca-app-pub-7354264038097352/8131740686';

const RatingComment = ({ route, navigation }) => {
    const { truyen, checkLog } = route.params;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchRatings(truyen.id);
    }, [truyen.id]);

    const fetchRatings = async (truyenId) => {
        try {
            const data = await getStoryRatings(truyenId);
            if(data.data) setResults(data.data);
        } catch (error) {
            console.log(error);

        }
    };

    const handleSubmit = async () => {


        try {
            if (loading) return;
            if (!rating) {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Vui lòng chọn số sao',
                });
                return;
            }

            if (comment.length < 3) {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Nhận xét tối thiểu 3 kí tự',
                });
                return;
            }
            // loading nếu có
            setLoading?.(true);

            const result = await submitRating(
                truyen.id,
                rating,
                comment
            );

            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Đã gửi đánh giá',
            });

        } catch (e) {

            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: e.message,
            });

        } finally {

            setLoading?.(false);
        }
    };


    return (
    <KeyboardAvoidingView  style={{ flex: 1, backgroundColor: '#fff' }}
                           behavior={
                               Platform.OS === 'ios'
                                   ? 'padding'
                                   : 'height'
                           }>
        <HeaderLight textTitle={'Nhận Xét'} link={''} />

        <FlatList style={{marginTop: 10}}
            data={results}
            renderItem={({ item }) => (
                <CommentItem item={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={
                      !loading ? (
                          <Text style={{ textAlign: 'center', marginTop: 20 }}>
                              Không có nhận xét nào
                          </Text>
                      ) : null
                  }
        />
        <View style={styles.boxComment}>
            {!checkLog ? (
                <View style={styles.boxAuth}>

                    <Text style={styles.textLoginRequired}>
                        Đăng nhập để đánh giá và bình luận truyện
                    </Text>

                    <View style={styles.authButtons}>

                        <TouchableOpacity
                            style={styles.btnLogin}
                            onPress={() => navigation.navigate('LoginScreen')}
                        >
                            <Text style={styles.btnAuthText}>
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>
                        <Text>Hoặc</Text>
                        <TouchableOpacity
                            style={styles.btnRegister}
                            onPress={() => navigation.navigate('RegisterScreen')}
                        >
                            <Text style={styles.btnAuthText}>
                                Đăng ký
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            ): (
              <View>
                  <Text style={styles.textStar}>Chọn từ 1 đến 10 sao</Text>
                  <View style={styles.boxStar}>
                      {[1,2,3,4,5,6,7,8,9,10].map((star) => (
                          <TouchableOpacity
                              key={star}
                              onPress={() => setRating(star)}
                          >

                              <Ionicons
                                  name={
                                      star <= rating
                                          ? 'star'
                                          : 'star-outline'
                                  }
                                  size={26}
                                  color="#1e40af"
                                  style={{ marginRight: 4 }}
                              />

                          </TouchableOpacity>

                      ))}
                  </View>
                  <Text style={styles.textComment}>Nội dung nhận xét tối thiểu 3 kí tự, tối đa 1000 kí tự</Text>
                  {/* TEXTAREA */}
                  <TextInput
                      value={comment}
                      placeholder="Viết cảm nhận của bạn..."
                      multiline
                      maxLength={1000}
                      textAlignVertical="top"
                      style={styles.inputComment}
                      onChangeText={(text) => {

                          const hasLink =
                              /(https?:\/\/|www\.|\.com|\.vn|\.net|t\.me|facebook\.com)/gi
                                  .test(text);

                          if (hasLink) {
                              return;
                          }

                          setComment(text);
                      }}
                  />

                  {/* BUTTON */}
                  <TouchableOpacity
                      style={styles.btnSubmit}
                      onPress={handleSubmit}
                  >

                      <Ionicons
                          name="send"
                          size={18}
                          color="#fff"
                      />

                      <Text style={styles.btnText}>
                          Gửi đánh giá
                      </Text>

                  </TouchableOpacity>
              </View>
            )}

        </View>
    </KeyboardAvoidingView>
    );
};

export default RatingComment;

const styles = StyleSheet.create({
    section: {
        paddingTop: 10,
        paddingBottom: 0,
    },
    boxComment:{
      paddingHorizontal: 30,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        paddingVertical: 15
    },
    textComment: {
        fontSize: 13,
        color: '#64748b',
        marginBottom: 5,
        marginTop: 10,
        lineHeight: 20,
    },
    inputComment: {
        minHeight: 100,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 10,
        padding: 12,
        fontSize: 15,
        color: '#0f172a',
        backgroundColor: '#f8fafc',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },
    btnSubmit: {
        marginTop: 15,
        backgroundColor: '#1e40af',
        paddingVertical: 14,
        borderRadius: 10,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStar:{
        textAlign: 'center'
    },
    boxStar:{
      flexDirection: 'row',
      justifyContent: 'center'
    },
    banner: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    grid: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        gap: 7,
        flexWrap: 'wrap'
    },
    emptyText: {
        marginTop: 35,
        color: '#94a3b8',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    boxAuth: {
        alignItems: 'center',
        paddingVertical: 20,
    },

    textLoginRequired: {
        fontSize: 15,
        color: '#444',
        marginBottom: 15,
        textAlign: 'center',
    },

    authButtons: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    btnLogin: {
        backgroundColor: '#1e40af',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 10,
    },

    btnRegister: {
        backgroundColor: '#16a34a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginLeft: 10
    },

    btnAuthText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
