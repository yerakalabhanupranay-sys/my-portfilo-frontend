import axios from 'axios';

let rawUrl = import.meta.env.VITE_API_URL || '';

// Remove trailing slash if present
if (rawUrl.endsWith('/')) {
    rawUrl = rawUrl.slice(0, -1);
}

// Ensure /api/ suffix for reliable baseURL joining
const API_URL = rawUrl.endsWith('/api') ? `${rawUrl}/` : `${rawUrl}/api/`;

if (!rawUrl) {
    console.error('VITE_API_URL is not defined in .env file!');
}

// Debug log for production
console.log('API_URL configured as:', API_URL);

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: (credentials) => api.post('auth/login', credentials),
};

export const profileService = {
    get: () => api.get('profile'),
    update: (data) => api.put('profile', data),
};

export const projectService = {
    getAll: () => api.get('projects'),
    create: (data) => api.post('projects', data),
    update: (id, data) => api.put(`projects/${id}`, data),
    delete: (id) => api.delete(`projects/${id}`),
};

export const serviceService = {
    getAll: () => api.get('services'),
    update: (data) => api.put('services', data),
};

export const contactService = {
    send: (data) => api.post('contact', data),
    getAll: () => api.get('contact'),
    delete: (id) => api.delete(`contact/${id}`),
};

export const uploadService = {
    upload: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post('upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export const statsService = {
    incrementViews: () => api.post('stats/increment'),
    getDashboardStats: () => api.get('stats/dashboard'),
};

export default api;
