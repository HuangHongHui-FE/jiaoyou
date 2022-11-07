import React, {Component} from 'react';
import {View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Nav from './src/nav';

import Geo from './src/utils/Geo';
class App extends Component {
  async componentDidMount(){
    // 定位权限等初始化
    let res = await Geo.initGeo();
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <Nav></Nav>
        </View>
      </SafeAreaProvider>
    );
  }
}

export default App;
