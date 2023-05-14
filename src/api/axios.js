import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../config/api';

const customAxios = axios.create({
  baseURL: BASE_URL,
});

export default customAxios;

// device token 추가해서 보내기
customAxios.interceptors.request.use(
  async config => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');

    if (fcmToken && !config.headers['userDeviceToken']) {
      config.headers['userDeviceToken'] = await AsyncStorage.getItem(
        'fcmToken',
      );
    }

    return config;
  },
  err => Promise.reject(err),
);
