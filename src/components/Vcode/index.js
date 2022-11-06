// 验证码输入组件
import React, {Component, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
// 输入验证码组件的style
import styles from './styles';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';

class App extends Component {
  render() {
    return (
      <View>
        <CodeField
          {...this.props}
          cellCount={6} // 单元格数量
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
    );
  }
}

export default App;
