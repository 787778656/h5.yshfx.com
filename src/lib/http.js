import axios from 'axios'
import qs from 'qs'

export default {
  get(url, data) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: data
      }).then((res) => {
        if (res) {
          resolve(res);
        }
      }).catch((error) => {
        reject(error);
      })
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      }).then((res) => {
        if (res.status == 200) {
          resolve(res.data);
        }
      }).catch((error) => {
        reject(error);
      })
    })
  }
}