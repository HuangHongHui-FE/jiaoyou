import {PermissionsAndroid, Platform} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';
import axios from 'axios';

class Geo {
  constructor() {
    this.resPermissions = ''; // 权限获取的结果
  }
  
  async initGeo() {
    if (Platform.OS == 'android') {
      // 请求地理位置权限
      let resPermission = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      this.resPermission = resPermission;
      console.log('resPermission---', resPermission);
      await init({
        android: '1485884a043fcbd93f4dff556239ceef', // 安卓应用的key
        ios: '1485884a043fcbd93f4dff556239ceef',
      });
      return Promise.resolve();
    }
  }

  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(({coords}) => {
        resolve(coords);
      }, reject); // 注意这种错误回调的写法
    });
  }

  async getCityByLocation() {
    if (
      this.resPermissions[android.permission.ACCESS_COARSE_LOCATION] !=
        'granted' ||
      this.resPermissions[android.permission.ACCESS_FINE_LOCATION] != 'granted'
    ) {
        await this.initGeo();
    }
    const {longitude, latitude} = await this.getCurrentPosition();
    const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      params: {
        location: `${longitude}, ${latitude}`,
        key: '310864b6f52ce65b11488ed6eb75dc42', // 地理逆解析的key
      },
    });
    return Promise.resolve(res.data); // 注意这种写法
  }
}

export default new Geo();
