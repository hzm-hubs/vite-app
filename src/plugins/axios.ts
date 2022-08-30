import axios from "axios";
import qs from "qs";
import config from "../config";
interface serverResponse {
    data: serverData;
}

interface serverData {}

axios.interceptors.request.use(
    (reqData: any, addCommonParams: boolean = true) => {
        // console.log("请求数据", reqData);
        // adapter: ƒ xhrAdapter(config)
        // data: ""
        // env: {FormData: null}
        // headers: {Accept: 'application/json, text/plain, */*'}
        // maxBodyLength: -1
        // maxContentLength: -1
        // method: "get"
        // params: {version: '1.0.1'}
        // timeout: 0
        // transformRequest: ƒ (data)
        // transformResponse: [ƒ]
        // transitional: {silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false}
        // url: "https://micro.qknode.com/qkbloc-novel/novels/novel/getConfigNovel"
        // validateStatus: ƒ validateStatus(status)
        // xsrfCookieName: "XSRF-TOKEN"
        // xsrfHeaderName: "X-XSRF-TOKEN"

        // 设置post时的请求格式
        reqData.headers.post["Content-Type"] =
            "application/x-www-form-urlencoded";

        // 统一处理请求数据
        reqData.transformRequest = function (data) {
            return qs.stringify(data);
        };

        // 添加公参数
        if (addCommonParams) {
            if (!reqData.params) {
                reqData.params = {};
            }

            reqData.params.version = config.version;
        }

        // 返回
        return reqData;
    }
);

// 响应拦截
axios.interceptors.response.use((respData: any) => {
    // console.log("返回数据", respData);
    return respData.data;
});

export default axios;
