import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    FlatList,
    TouchableOpacity,
    ActivityIndicator, StyleSheet
} from 'react-native';

import {getChapters} from "../api/truyenApi";

export default function ChapterModal({ visible, onClose, truyenId, onSelect }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const LIMIT = 20;

    const fetchChapters = async (reset = false) => {
        if (loading || (!hasMore && !reset)) return;

        setLoading(true);

        try {
            const currentPage = reset ? 1 : page;

            const json = await getChapters(truyenId, currentPage, LIMIT);

            if (!json) return;

            if (reset) {
                setData(json.data);
                setPage(2);
            } else {
                setData(prev => [...prev, ...json.data]);
                setPage(prev => prev + 1);
            }

            if (currentPage >= json.total_pages) {
                setHasMore(false);
            }

        } catch (e) {
            console.log(e);
        }

        setLoading(false);
    };

    // 🔥 load khi mở modal
    useEffect(() => {
        if (visible) {
            setData([]);
            setPage(1);
            setHasMore(true);
            fetchChapters(true);
        }
    }, [visible, truyenId]);

    return (
        <Modal visible={visible}  animationType="slide"   transparent={true}>
            <View style={styles.chapterWrap}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        Danh sách chương
                    </Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={{ color: 'red' }}>Đóng</Text>
                    </TouchableOpacity>
                </View>

                {/* List */}
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}

                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.itemChap}
                            onPress={() => {
                                onSelect?.(item);
                                onClose();
                            }}
                        >
                            <Text>{item.title}</Text>
                            <Text>{item.ten_chuong}</Text>
                        </TouchableOpacity>
                    )}

                    onEndReached={() => fetchChapters()}
                    onEndReachedThreshold={0.5}

                    ListFooterComponent={
                        loading ? <ActivityIndicator size="large" /> : null
                    }
                />

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    chapterWrap:{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50,
        padding: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // 🔥 SHADOW iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,

        // 🔥 SHADOW Android
        elevation: 8,
    },
    itemChap:{
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#efefef',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});