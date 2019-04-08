import axios from "axios";
import Qs from "qs";
//axios.defaults.baseURL = DOMAIN_URL;
// 设置axios默认Content-type类型
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

axios.defaults.transformRequest = [
  function(data) {
    //console.log(data);
    if (data instanceof FormData) {
      return data;
    }
    data = Qs.stringify(data);
    return data;
  }
];
axios.defaults.transformResponse = [
  function(data) {
    data = JSON.parse(data);
    if (data.code === "100009" || data.code === "100016") {
      window.location.href = `/login?routeurl=${
        window.location.origin
      }${encodeURIComponent(location.hash)}`;
      return;
    }
    return data;
  }
];

axios.interceptors.request.use(
  function(config) {
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

function http(url, params = null, type = "get") {
  return new Promise((resolve, reject) => {
    axios[type](
      url,
      type === "get"
        ? {
            params: params
          }
        : params
    )
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        if (err === "Error: timeout of 5000ms exceeded") {
          console.log("服务器请求超时");
          return;
        }
        console.error(err.stack);
        reject(err);
      });
  });
}

const get = function(url, params = null) {
  return http(url, params, "get");
};

const post = function(url, params = null) {
  return http(url, params, "post");
};

export default {
  http,
  get,
  post
};
