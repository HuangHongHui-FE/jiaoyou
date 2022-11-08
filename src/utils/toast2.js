import React from 'react';
import {ToastAndroid, Alert, Platform} from 'react-native';

let customKey = null;
const Toast = {}
// time="SHORT"
Toast.show = (title, msg) => {
  if (customKey) return;
//   if(Platform.OS == 'android'){
//     ToastAndroid.show(title, ToastAndroid[time] || ToastAndroid.SHORT);
//   }
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
};

Toast.hide = () => {
  if (!customKey) return;
  customKey = null;
};
export default Toast;
