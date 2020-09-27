const axios = require('axios');

const instance = axios.create({
  timeout: 5000
});

// 请求拦截
// 暂时无需鉴权
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
)

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    const { status, data, headers } = response;
    if (status === 200) {
      return data;
    }
  },
  (error) => {
    return Promise.resolve({
      err_code: -1,
      message: 'error',
      data: {
        error
      }
    })
  }
)

// 挂载all、spread到实例上面
instance.all = axios.all;
instance.spread = axios.spread;

module.exports = instance;