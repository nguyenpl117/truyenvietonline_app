import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Header from "./Header";
import SelectTheLoaiDropdown from "./SelectTheLoai";
import BookCard from "./BookCard";
import HeaderLight from "./HeaderLight";
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";
const adUnitIdBanner = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-7354264038097352/8131740686';
const FavoriteScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    // load danh sách
    const loadFavorites = async () => {
        try {
            const data = await AsyncStorage.getItem('favorites');
            const parsed = data ? JSON.parse(data) : [];
            setFavorites(parsed);
        } catch (e) {
            console.log(e);
        }
    };

    // reload khi vào màn
    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    // xoá khỏi yêu thích
    const removeFavorite = async (id) => {
        try {
            const data = await AsyncStorage.getItem('favorites');
            let list = data ? JSON.parse(data) : [];

            const newList = list.filter(item => item.id !== id);

            await AsyncStorage.setItem('favorites', JSON.stringify(newList));
            setFavorites(newList);
        } catch (e) {
            console.log(e);
        }
    };


    // empty state
    if (favorites.length === 0) {
        return (
            <View style={styles.container}>
                <HeaderLight textTitle={'Truyện Yêu Thích'} link={''} />
                <Text style={styles.emptyText}>
                    Chưa có truyện yêu thích 🤍
                </Text>
                {/* Banner Ad sticky bottom */}
                <View style={styles.banner}>
                    <BannerAd
                           unitId={adUnitIdBanner} // test or real id
                        size={BannerAdSize.BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>
            </View>
        );
    }


    const renderItem = (data, backgroundColor) => (
        <View style={[styles.section, { backgroundColor }]}>

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
    <View style={styles.container}>
        <HeaderLight textTitle={'Truyện Yêu Thích'} link={''} />
        <ScrollView style={{marginTop: 10}}>
        {renderItem(favorites, '#f1f5f9')}
        </ScrollView>
        {/* Banner Ad sticky bottom */}
        <View style={styles.banner}>
            <BannerAd
                   unitId={adUnitIdBanner} // test or real id
                size={BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    </View>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    section: {
        paddingTop: 10,
        paddingBottom: 0,
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
});
