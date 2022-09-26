import axios from "axios"

const axiosDoctor = axios.create({
    baseURL: 'http://localhost:7000'
})

axiosDoctor.interceptors.request.use((requestConfig) => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    if (accessToken) {
        requestConfig.headers["Authorization"] = "Bearer " + accessToken
    }
    return requestConfig
}, (error) => {
    return Promise.reject(error.message);
});

axiosDoctor.interceptors.response.use((res) => {
    return res;
}, async (err) => {
    const originalConfig = err.config;
    const statusCode = err.response.status;
    if (statusCode === 401 && originalConfig.url === '/docauth/token') {
        return Promise.reject(err.message);
    }
    if (statusCode === 401) {
        const tokenResponse = await axiosDoctor.post('/docauth/token', {
            token: localStorage.getItem('refresh_token')
        })
        console.log(tokenResponse)
        console.log(tokenResponse.data.accessToken);
        localStorage.setItem('access_token', tokenResponse.data.accessToken)
        return axiosDoctor(originalConfig)
    }
    return Promise.reject(err.message)
})

export default axiosDoctor