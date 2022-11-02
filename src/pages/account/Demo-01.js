// 验证码输入组件

import React, {Component, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {
  CodeField,
  Cursor
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#7d53ea'
  },
});

class App extends Component {
  state = {
    vcodeText: 0,
  };

  setvcodeText(vcodeText) {
    this.setState({
        vcodeText
    })
  }

  render() {

    const {vcodeText} = this.state;
    return (
      <View>
        <CodeField
          value={vcodeText}
          onChangeText={(value) => this.setvcodeText(value)}
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
