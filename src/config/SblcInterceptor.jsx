import { endPoints } from "../env/endPoints";
import axios from 'axios';

export const sblcInterceptor = axios.create({
    baseUrl: endPoints.baseUrl
});

sblcInterceptor.interceptors.request.use(request=> {
    request.withCredentials = true;
    request.headers['Authorization'] = 'Bearer '+ localStorage.getItem('token');
    console.log(request);
    return request;
});

sblcInterceptor.interceptors.response.use(response => {
    return response;
})