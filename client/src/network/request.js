import axios from 'axios';
import * as $Tools from '../utils/tools'
import store from '../store'

export function request(config) {
  // 创建axios实例 返回的是Promise
  const instance = axios.create({
    // 设置基本地址
    baseURL: 'http://localhost:3000',
    // 设置超时时间 超过则自动终止，认为请求失败
    timeout: 10000,
    headers: {
      ...config.headers,
    },
    withCredentials: true,
  });

  instance.interceptors.response.use(
    res => {
      if (res.status === 200) {
        if (res.data.code === 2006) {
          $Tools.showMessage(res.data.msg, 'error', 1500)
          store.state.LoginRegisterVisible = true
        }
      }
      return res
    },
    err => {
      console.error(err);
    }
  )
  return instance(config);
}
