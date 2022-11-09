import React, {Component} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Nav from './src/nav';

import Geo from './src/utils/Geo';

import RootStore from './src/mobx';
import {Provider} from 'mobx-react';
class App extends Component {
  async componentDidMount() {
    // 定位权限等初始化
    let res = await Geo.initGeo();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Provider RootStore={RootStore}>
          <Nav></Nav>
        </Provider>
      </View>
    );
  }
}

export default App;
