import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '25100934-20748130337a9877518758e4e';

function fetchPicture(name) {
  const response = axios.get(
    `?q=${name}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response) {
    return response;
  }
  return Promise.reject(new Error('There is no picture for that name'));
}

const api = { fetchPicture };
export default api;
