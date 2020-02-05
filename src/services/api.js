import Taro from '@tarojs/taro'
import { base } from './config'
import { resolve } from 'upath';
import { rejects } from 'assert';

export default {
    baseOptions(params, method = 'GET') {
      let { url, data } = params
      let contentType = 'application/json'
      contentType = params.contentType || contentType
      const option = {
        isShowLoading: false,
        loadingText: '正在加载',
        url: base + url,
        data: data,
        method: method,
        header: { 'content-type': contentType },
        success(res) {
          if (res.statusCode === 200) {
            return res.data
          }
        },
        error(err) {
          console.log(err)
        }
      }
      return new Promise((resolve,reject)=>{
        Taro.request(option).then(res=>{
          if (res.statusCode === 200) {
            resolve(res.data)
          }else{
            console.log(res.data)
            Taro.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
            reject()
          }
        })
      })
    },
    get(url, data = '') {
      let option = { url, data }
      return this.baseOptions(option)
    },
    post(url, data, contentType) {
      let params = { url, data, contentType }
      return this.baseOptions(params, 'POST')
    }
  }