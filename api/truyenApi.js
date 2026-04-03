import { Buffer } from 'buffer'; // React Native cần buffer để encode Base64
import {
    getChapterPageCache,
    getTruyenTheLoaiCache,
    setChapterPageCache, setTruyenTheLoaiCache,
} from './cache';

import { getChapterDetailCache, setChapterDetailCache } from './cache';
const username = 'app_truyenviet';
const appPassword = 'jU90 DDFd B9M0 LlFI sbiV gn5y';
const baseUrl = 'https://truyenvietonline.com/wp-json/truyen-api/v1'; // đổi thành URL WP của bạn

// Encode Base64 cho Basic Auth
const token = Buffer.from(`${username}:${appPassword}`).toString('base64');

const headers = {
    'Authorization': `Basic ${token}`,
    'Accept': 'application/json'
};



// 1️⃣ Lấy chi tiết truyện
export const getTruyenDetail = async (id) => {
    try {

        const response = await fetch(`${baseUrl}/detail/${id}`, { headers });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('getTruyenDetail lỗi:', error.message);
        throw error;
    }
};


export const getChapterDetail = async (id) => {
    try {
        const cached = getChapterDetailCache(id);
        if (cached) return cached;
        const response = await fetch(`${baseUrl}/chapter/${id}`, { headers });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }

        const data = await response.json();
        setChapterDetailCache(id, data);
        return data;

    } catch (error) {
        console.error('getChapterDetail lỗi:', error.message);
        throw error;
    }
};


export const getChapters = async (truyenId, page = 1, limit = 20) => {
    try {

        // 🔥 check cache trước
        const cached = getChapterPageCache(truyenId, page);

        if (cached) {
            console.log(`⚡ cache page ${page}`);
            return cached;
        }

        console.log(`🌐 call API page ${page}`);


        const response = await fetch(
            `${baseUrl}/chapters?truyen_id=${truyenId}&page=${page}&limit=${limit}`, { headers }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }
        const data = await response.json();
        // 🔥 lưu cache
        setChapterPageCache(truyenId, page, data);
        return data;
    } catch (e) {
        console.log('API error:', e);
        return null;
    }
};

// 2️⃣ Lấy danh sách truyện phân trang
export const getTruyenList = async (page = 1, perPage = 10) => {
    try {
        const response = await fetch(`${baseUrl}/list?page=${page}&per_page=${perPage}`, { headers });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('getTruyenList lỗi:', error.message);
        throw error;
    }
};

// 3️⃣ Tìm kiếm truyện
export const searchTruyen = async (query, page = 1) => {
    try {
        const response = await fetch(`${baseUrl}/search?q=${encodeURIComponent(query)}&page=${page}`, { headers });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('searchTruyen lỗi:', error.message);
        throw error;
    }
};
// 3️⃣ Tìm kiếm truyện
export const authorTruyen = async (id, page = 1) => {
    try {
        const response = await fetch(`${baseUrl}/author/${id}?page=${page}`, { headers });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('searchTruyen lỗi:', error.message);
        throw error;
    }
};// 3️⃣ Tìm kiếm truyện
export const categoryTruyen = async (id, page = 1) => {
    try {
        const response = await fetch(`${baseUrl}/category/${id}?page=${page}`, { headers });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('searchTruyen lỗi:', error.message);
        throw error;
    }
};

// 4 Lay The Loai Truyen
export const getTheLoai = async () => {
    try {
        const cached = getChapterDetailCache('the-loai');
        if (cached) return cached;

        const response = await fetch(`${baseUrl}/the-loai`, { headers });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }

        const data = await response.json();
        setChapterDetailCache('the-loai', data);
        return data;

    } catch (error) {
        console.error('searchTruyen lỗi:', error.message);
        throw error;
    }
};

// 5 Lay The Loai Truyen Detail
export const getTheLoaiDetail = async (id) => {
    try {
        const cached = getTruyenTheLoaiCache(id);
        if (cached) return cached;

        const response = await fetch(`${baseUrl}/truyen-the-loai/${id}`, { headers });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || 'Không lấy được dữ liệu'}`);
        }
        const data = await response.json();
        setTruyenTheLoaiCache(id, data);
        return data;

    } catch (error) {
        console.error('searchTruyen1 lỗi:', error.message);
        throw error;
    }
};




