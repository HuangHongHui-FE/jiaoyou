import React from 'react';
import {ActivityIndicator} from 'react-native'
// import {Toast} from 'teaset-pro'

let customKey = null;

Toast.showLoading = (text) => {
  if (customKey) return;
  customKey = Toast.show({
    text,
    icon: <ActivityIndicator size='large' />,
    position: 'center',
    duration: 100000,
  });
}

Toast.hideLoading = () => {
  if (!customKey) return;
  Toast.hide(customKey);
  customKey = null;
}

export default Toast;