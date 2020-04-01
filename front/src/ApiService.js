import axios from 'axios';

class ApiService {
  upload(data) {
    const url = 'fashionq/upload/';
    console.log(data);
    return axios.post(url, data);
  }
}

export default new ApiService();
