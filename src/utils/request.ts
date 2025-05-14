import axios from "axios";
import { showMessage } from "./status"; // 引入状态码文件
import $router from '@/router'
// 设置接口超时时间
axios.defaults.timeout = 3600000;
// 响应拦截
axios.interceptors.response.use(
  (response) => {  
    return response;
  },
  (error) => { 
    
    let {response} = error;   
   
    if(response){
      const errData = {
        msg: response.data.error?response.data.error:showMessage(response.status),
        status: response.status,
      } 
      if(errData.status === 401) {
        $router.push("/login");
      } 
      return Promise.reject(errData);
    }  
  },
);

 

// 封装 请求并导出
export function request(data: any) {
  axios.defaults.baseURL = data.baseUrl
    ? data.baseUrl
    : import.meta.env.VITE_API_AUTH_BASE; // 自定义接口地址
  //请求拦截
  axios.interceptors.request.use(
    (config) => {  
      // 配置请求头
      if (data.header && Object.keys(data.header).length > 0) {
        config.headers = data.header;
      } 
      return config;
    },
    (error) => {  
      return Promise.reject(error);
    },
  );
  return new Promise((resolve, reject) => {
    const promise = axios(data);
    //处理返回
    promise
      .then((res: any) => {
        if(res){
          resolve(res.data);
        } else {
          reject(res);
        } 
      })
      .catch((err: any) => {  
        let errData = err;
        if(err.error==='Unauthorized'){ 
          errData.status = 401; 
        }
        reject(errData);
      });
  });
}
