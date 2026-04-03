const CACHE_TIME = 5 * 60 * 1000; // 5 phút

const cache = {
    chapters: {}, // theo truyenId
    chapterDetail: {}, // theo chapterId
    listTruyenTheLoai: {} // theo TheLoaiID
};

// 🔥 check expire
const isValid = (item) => {
    if (!item) return false;
    return Date.now() - item.time < CACHE_TIME;
};

// =======================
// 📚 DANH SÁCH CHƯƠNG
// =======================
// 👉 lấy cache
export const getChapterPageCache = (truyenId, page) => {
    return cache.chapters[truyenId]?.[page] || null;
};

// 👉 set cache
export const setChapterPageCache = (truyenId, page, data) => {
    if (!cache.chapters[truyenId]) {
        cache.chapters[truyenId] = {};
    }

    cache.chapters[truyenId][page] = data;
};

// =======================
// 📖 CHI TIẾT CHƯƠNG
// =======================

export const getChapterDetailCache = (chapterId) => {
    const item = cache.chapterDetail[chapterId];
    return isValid(item) ? item.data : null;
};

export const setChapterDetailCache = (chapterId, data) => {
    cache.chapterDetail[chapterId] = {
        data,
        time: Date.now()
    };
};



// =======================
// 📖 TRuyen Theo Danh MUc
// =======================

export const getTruyenTheLoaiCache = (theLoaiID) => {
    const item = cache.listTruyenTheLoai[theLoaiID];
    return isValid(item) ? item.data : null;
};

export const setTruyenTheLoaiCache = (theLoaiID, data) => {
    cache.listTruyenTheLoai[theLoaiID] = {
        data,
        time: Date.now()
    };
};

