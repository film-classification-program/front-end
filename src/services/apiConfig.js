// API配置文件

// 从环境变量获取API主机地址，如果未设置则使用默认值
const apiHost = import.meta.env.VITE_FILM_WEB_API_HOST || 'http://localhost:4000';

export const API_BASE_URL = apiHost; 