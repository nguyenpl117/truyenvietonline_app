import React, {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet, ScrollView, Platform
} from 'react-native';
import BookCard from "./BookCard";
import HeaderLight from "./HeaderLight";
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";
import {getTopTruyenRate} from "../api/truyenApi";
const adUnitIdBanner = __DEV__
    ? TestIds.BANNER
    : Platform.OS === 'ios'
        ? 'ca-app-pub-7354264038097352/4880026850'
        : 'ca-app-pub-7354264038097352/8131740686';
const RateBook = ({ navigation }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTopTruyenRate = async () => {
        try {
            setLoading(true);
            const res = await getTopTruyenRate();
            console.log(res)

            const newData = res || [];
            setResults(newData);

        } catch (error) {
            console.log('Search error:', error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTopTruyenRate()
    }, []);



    // empty state
    if (results.length === 0) {
        return (
            <View style={styles.container}>
                <HeaderLight textTitle={'Đánh Giá'} link={''} />
                <Text style={styles.emptyText}>
                    Chưa có truyện được đánh giá 🤍
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
        <HeaderLight textTitle={'Đánh Giá'} link={''} />
        <ScrollView style={{marginTop: 10}}>
        {renderItem(results, '#f1f5f9')}
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

export default RateBook;

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
