import axios from "axios";
import qs from "qs";
import config from "../config";
interface serverResponse {
    data: serverData;
}

interface serverData {}

const instance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 5000,
});

instance.interceptors.request.use((reqData: any) => {
    console.log("请求数据", reqData);

    if (!reqData?.headers["Content-Type"]) {
        reqData.headers["Content-Type"] = "application/json";
    }

    // 使用qs统一处理请求数据格式
    // reqData.transformRequest = function (data) {
    //     return qs.stringify(data);
    // };

    // 添加公参数
    if (!reqData.params) {
        reqData.params = {};
    }
    reqData.params.version = config.version;

    // 返回
    return reqData;
});

// 响应拦截
instance.interceptors.response.use((respData: any) => {
    // console.log("返回数据", respData);
    return respData.data;
});

export default instance;
