import React from 'react';
import { ReactDOM } from 'react';
import {ActivityIndicator} from 'react-native'
import {Dialog} from '@rneui/themed';

let customKey = null;

Dialog.showLoading = (text) => {
  if (customKey) return;
  customKey = ReactDOM.findDomNode(Dialog.Loading('aaa'));
}

Dialog.hideLoading = () => {
  if (!customKey) return;
  Toast.hide(customKey);
  customKey = null;
}

console.log(Toast)
export default Toast;