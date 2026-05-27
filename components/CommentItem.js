import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function CommentItem({ item }) {

    return (
        <View style={styles.commentItem}>

            {/* AVATAR */}
            <Image
                source={{
                    uri:   item?.avatar && item.avatar.trim() !== ''
                        ? item.avatar : 'https://truyenvietonline.com/wp-content/themes/truyenviet/assets/images/logo-truyen-viet-online.png'
                }}
                style={styles.avatar}
            />

            {/* CONTENT */}
            <View style={styles.rightContent}>

                {/* NAME */}
                <Text style={styles.userName}>
                    {item.display_name}
                </Text>

                {/* STARS */}
                <View style={styles.starRow}>

                    {[1,2,3,4,5,6,7,8,9,10].map((star) => (

                        <Ionicons
                            key={star}
                            name={
                                star <= item.rating
                                    ? 'star'
                                    : 'star-outline'
                            }
                            size={18}
                            color="#1e40af"
                            style={{ marginRight: 2 }}
                        />

                    ))}

                </View>

                {/* COMMENT */}
                <View style={styles.commentBox}>

                    <Text style={styles.commentText}>
                        {item.comment}
                    </Text>

                </View>

                {/* TIME */}
                <Text style={styles.timeText}>
                    {item.time}
                </Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    commentItem: {
        flexDirection: 'row',
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        paddingHorizontal: 20
    },

    avatar: {
        width: 35,
        height: 35,
        borderRadius: 25,
        marginRight: 12,
    },

    rightContent: {
        flex: 1,
    },

    userName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6,
    },

    starRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },

    commentBox: {
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
    },

    commentText: {
        fontSize: 13,
        lineHeight: 20,
        color: '#111827',
    },

    timeText: {
        marginTop: 5,
        fontSize: 12,
        color: '#1e40af',
        fontWeight: '500',
    },

});