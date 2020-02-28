import Taro from "@tarojs/taro";
import { base } from "./config";
import { showToast } from '../utils/util'

export default {
    baseOptions(params, method = "GET") {
        let { url, data } = params;
        let contentType = "application/json";
        contentType = params.contentType || contentType;
        const option = {
            isShowLoading: false,
            loadingText: "正在加载",
            url: base + url,
            data: data,
            method: method,
            header: {
                "content-type": contentType
            },
            success(res) {
                if (res.statusCode === 200) {
                    return res.data;
                }
            },
            error(err) {
                console.log(err);
            }
        };
        return new Promise((resolve, reject) => {
            Taro.showLoading({
              title: '',
              mask:true
            })
            Taro.request(option).then(res => {
                Taro.hideLoading()
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    console.log(res.data);
                    showToast(res.data.message)
                    reject();
                }
            }).catch(res=>{
                Taro.hideLoading()
                console.log(res)
                reject();
            });
        });
    },
    get(url, data = "") {
        let option = {
            url,
            data
        };
        return this.baseOptions(option);
    },
    post(url, data, contentType) {
        let params = {
            url,
            data,
            contentType
        };
        return this.baseOptions(params, "POST");
    }
};
