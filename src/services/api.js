import Taro from '@tarojs/taro'
import { base } from './config'

let token = ''

export default {
    baseOptions(params, method = 'GET') {
      let { url, data } = params
      let contentType = 'application/x-www-form-urlencoded'
      contentType = params.contentType || contentType
      const option = {
        isShowLoading: false,
        loadingText: '正在加载',
        url: base + url,
        data: data,
        method: method,
        header: { 'content-type': contentType, 'token': token },
        success(res) {
          if (res.statusCode === 403) {
            return
          }else if (res.statusCode === 404) {
            return
          } else if (res.statusCode === 200) {
            return res.data
          }
        },
        error(err) {
          console.log(err)
        }
      }
      return Taro.request(option)
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