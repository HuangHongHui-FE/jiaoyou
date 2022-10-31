import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { pxToDp } from '../../utils/stylesKits';
export default class Index extends React.Component {
  static defaultProps={
    style: {},
    textStyle: {}
  }
  render() {
    return (
      <TouchableOpacity style={{width: "100%", height: "100%", ...this.props.style}} onPress={this.props.onPress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFD801', '#FF8040', '#F75D59']}
          style={styles.linearGradient}>
          <Text style={{...styles.buttonText, ...this.props.textStyle}}>{this.props.children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    width: pxToDp(200),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
    justifyContent: "center", 
    alignItems: "center"
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    textAlign: 'center',
  },
});
