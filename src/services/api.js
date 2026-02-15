import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    login: (credentials) => api.post('/auth/login', credentials),
};

export const profileService = {
    get: () => api.get('/profile'),
    update: (data) => api.put('/profile', data),
};

export const projectService = {
    getAll: () => api.get('/projects'),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
};

export const serviceService = {
    getAll: () => api.get('/services'),
    update: (data) => api.put('/services', data),
};

export const contactService = {
    send: (data) => api.post('/contact', data),
    getAll: () => api.get('/contact'),
};

export const uploadService = {
    upload: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export default api;
