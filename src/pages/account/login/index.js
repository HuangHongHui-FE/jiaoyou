import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  View,
  Button,
  Text,
  Image,
  StatusBar,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';

import validator from '../../../utils/validator';
// ui库的用
import {Input, Icon, Dialog} from '@rneui/themed';

// import {Toast} from '../../../utils/Toast.js'
import request from '../../../utils/request';
import {ACCOUNT_LOGIN} from '../../../utils/pathMap';

import THButton from '../../../components/THButton';
class Index extends Component {
  constructor() {
    super();
  }

  state = {
    phoneNumber: '15538920602',
    // 手机号码是否合法
    phoneValid: true,
    visibleDialogLoading: true,
  };

  phoneNumberChangeText(phoneNumber) {
    console.log(phoneNumber);
    this.setState({
      phoneNumber,
    });
  }

  toggleDialogLoading() {
    this.setState({
      visibleDialogLoading: !this.state.visibleDialogLoading,
    });
  }
  async phoneNumberSubmitEditing() {
    // 手机号码点击完成
    console.log('完成');
    const {phoneNumber} = this.state;
    const phoneValid = validator.validatorPhone(phoneNumber);
    if (!phoneValid) {
      this.setState({
        phoneValid,
      });
      return;
    }

    let res = await request.post(ACCOUNT_LOGIN, {phone: phoneNumber});
    console.log(res);
  }

  // 点击获取验证码按钮
  handleGetVcode() {}

  render() {
    // <Dialog.Loading />
    const {phoneNumber, phoneValid, visibleDialogLoading} = this.state;
    // console.log(Dimensions.get("window").height)
    return (
      <View>
        {/* 状态栏, 透明,图片直接已移动到了上面 */}
        <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
        {/* 背景图片, 200为安卓单位dp， px转dp */}
        <Image
          style={{width: '100%', height: pxToDp(200)}}
          source={require('../../../res/profileBackground.jpg')}></Image>

        <View style={{padding: pxToDp(20)}}>
          <View>
            <View>
              <Text
                style={{
                  fontSize: pxToDp(25),
                  color: '#888',
                  fontWeight: 'bold',
                }}>
                手机号登录注册
              </Text>
            </View>

            <View style={{marginTop: pxToDp(30)}}>
              <Input
                placeholder="请输入手机号码"
                maxLength={11}
                keyboardType="phone-pad" // 默认弹出数字输入键盘
                inputStyle={{color: '#333'}}
                value={phoneNumber}
                onChangeText={phoneNumber =>
                  this.phoneNumberChangeText(phoneNumber)
                }
                errorMessage={phoneValid ? '' : '手机号码格式不正确'}
                onSubmitEditing={() => this.phoneNumberSubmitEditing()}
                leftIcon={{
                  type: 'font-awesome',
                  name: 'phone',
                  color: '#ccc',
                  size: pxToDp(20),
                }}
              />
            </View>
          </View>
        </View>

        {/* 渐变按钮 */}
        <View>
          <THButton
            style={{width: '100%', height: pxToDp(40), justifyContent: "center", alignItems: "center"}}
            onPress={() => this.handleGetVcode()}>
            获取验证码
          </THButton>
        </View>
      </View>
    );
  }
}

export default Index;
