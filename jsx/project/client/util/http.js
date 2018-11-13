import axios from 'axios';

const baseUrl = '';

const parseUrl = (url, params) => {
  const query = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`;
    return result;
  }, '');
  return `${baseUrl}/${url}?${query.substr(0, query.length - 1)}`
};

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then(resp => {
        const data = resp.data;
        if (data && data.success === true) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch(err => {
        if (err.response) {
          reject(err.response.data);
        } else {
          reject({
            success: false,
            err_msg: err.message
          })
        }
      })
  })
};
