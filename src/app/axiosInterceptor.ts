import axios from "axios"

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        // 设置默认的请求头，例如将 JWT 放在 Authorization 字段中
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // 在发送请求前进行认证检查
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        const { authorization } = response.headers
        authorization && localStorage.setItem("jwtToken", authorization)
        return response;
    })
export { axiosInstance }