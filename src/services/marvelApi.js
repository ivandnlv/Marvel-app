import axios from 'axios';

const marvelApi = async (path) => {
  const _apiKey = 'apikey=ec6009a945502609bb4d9e86e94c1e80';
  const response = await axios.get(`https://gateway.marvel.com:443/v1/public/${path}?${_apiKey}`);
  return response;
};

export default marvelApi;
