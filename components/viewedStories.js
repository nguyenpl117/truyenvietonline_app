// viewedStories.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Lấy danh sách truyện đã xem
export const getViewedStories = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@viewed_stories');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Lỗi lấy viewed stories:', e);
        return [];
    }
};

// Thêm hoặc cập nhật truyện đã xem
export const addViewedStory = async (story, chapter_id, chapterNumber) => {
    try {
        const viewedStories = await getViewedStories();

        const existing = viewedStories.find(s => s.id === story.id);

        if (existing) {
            // Cập nhật nếu chương mới lớn hơn chương cũ
            if (chapterNumber > existing.lastReadChapter) {
                existing.lastReadChapter = chapterNumber;
                existing.chapter_id = chapter_id;
                existing.timestamp = Date.now();
            }
            // Loại bỏ bản cũ và thêm bản cập nhật lên đầu
            const newList = viewedStories.filter(s => s.id !== story.id);
            newList.unshift(existing);
            await AsyncStorage.setItem('@viewed_stories', JSON.stringify(newList));
        } else {
            // Thêm truyện mới
            const newList = [
                {
                    id: story.id,
                    title: story.title,
                    cover: story.thumbnail,
                    lastReadChapter: chapterNumber,
                    chapter_id: chapter_id,
                    timestamp: Date.now()
                },
                ...viewedStories
            ];
            await AsyncStorage.setItem('@viewed_stories', JSON.stringify(newList));
        }
    } catch (e) {
        console.error('Lỗi thêm truyện đã xem:', e);
    }
};
