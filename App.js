import React, {Component} from 'react';
import {View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Nav from './src/nav';

class App extends Component {
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
