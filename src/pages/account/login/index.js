import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  ToastAndroid,
  StyleSheet,
  Alert,
} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';

import validator from '../../../utils/validator';
// ui库的用
import {Input, Icon, Dialog} from '@rneui/themed';

// import Toast from '../../../utils/toast2'
// import Toast from '../../../components/Toast';
// import Toast from '../../../utils/toast3'
// import Toast from '../../../utils/Toast';
// import {Toast} from 'teaset-pro'

import request from '../../../utils/request';
import {ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE} from '../../../utils/pathMap';

import THButton from '../../../components/THButton';

// 验证码输入组件
import Vcode from '../../../components/Vcode';

import {inject, observer} from 'mobx-react';

@inject('RootStore')
@observer
class Index extends Component {
  constructor() {
    super();
  }

  state = {
    phoneNumber: '15538920602',
    // 手机号码是否合法
    phoneValid: true,
    visibleDialogLoading: false,

    // 是否显示登陆页面
    showLogin: true,

    // 验证码输入的值
    vcodeText: 0,

    // 倒计时按钮的文本
    btnText: '重新获取',
    // 是否在倒计时中
    isCountDowning: false,
  };

  // 输入框输入完成事件
  phoneNumberChangeText(phoneNumber) {
    console.log('phoneNumber---', phoneNumber);
    this.setState({
      phoneNumber,
    });
  }

  toggleDialogLoading() {
    this.setState({
      visibleDialogLoading: !this.state.visibleDialogLoading,
    });
  }

  // 手机号码点击完成
  async phoneNumberSubmitEditing() {
    console.log('完成');
    const {phoneNumber} = this.state;
    const phoneValid = validator.validatorPhone(phoneNumber);
    if (!phoneValid) {
      this.setState({
        phoneValid,
      });
      return;
    }

    // 开
    // let res = await request.post(ACCOUNT_LOGIN, {phone: phoneNumber});
    // console.log(res);
    let res = {
      code: '10000',
    };
    if (res.code == '10000') {
      this.setState({
        showLogin: false,
      });

      // 验证码倒计时
      this.countDown();
    } else {
    }
  }

  // 验证码输入完成
  async onVcodeSubmitEditing() {
    const {vcodeText, phoneNumber} = this.state;
    if (vcodeText.length != 6) {
      // add     弹框事件
      Alert('验证码填写错误');
    }

    // 开
    // const res = await request.post(ACCOUNT_VALIDATEVCODE, {
    //   phone: phoneNumber,
    //   vcode: vcodeText
    // })

    const res = {
      code: '10000',
      data: {
        isNew: true,
        token: 'woshitoken',
        id: '2222'
      },
    };

    if (res.code != '10000') {
      return;
    }

    // 存储用户信息到mobx
    this.props.RootStore.setUserInfo(phoneNumber, res.data.token, res.data.id);

    // 新用户
    if (res.data.isNew) {
      this.props.navigation.navigate('UserInfo'); // 跳转到用户信息
    } else {
      Alert('老用户');
    }
  }

  // 验证码输入事件
  setvcodeText(vcodeText) {
    this.setState({
      vcodeText,
    });
  }

  // 开启验证码的定时器
  countDown() {
    const {isCountDowning} = this.state;

    if (isCountDowning) {
      return;
    }
    this.setState({
      isCountDowning: true,
    });

    let seconds = 5;
    // 重新获取（5）
    let timer = setInterval(() => {
      seconds--;
      this.setState({
        btnText: `重新获取(${seconds})s`,
      });

      if (seconds == 0) {
        clearInterval(timer);
        this.setState({
          btnText: '重新获取',
          isCountDowning: false,
        });
      }
    }, 1000);
  }

  // 渲染获取登录组件
  renderLogin() {
    const {phoneNumber, phoneValid} = this.state;
    return (
      <View>
        <View style={{padding: pxToDp(20)}}>
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

        {/* 渐变按钮 */}
        <View>
          <THButton
            style={{
              width: '100%',
              height: pxToDp(40),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // 注意下这里绑定的事件
            onPress={() => this.phoneNumberSubmitEditing()}>
            获取验证码
          </THButton>
        </View>
      </View>
    );
  }

  // 渲染获取验证码组件
  renderVcode() {
    const {vcodeText, btnText, isCountDowning} = this.state;

    return (
      <View>
        <View>
          <Text
            style={{fontSize: pxToDp(20), color: '#888', fontWeight: 'bold'}}>
            输入六位验证码
          </Text>
        </View>

        <View>
          <Text style={{marginTop: pxToDp(15), color: '#888'}}>已发</Text>
        </View>

        {/* 验证码输入组件Demo1 */}
        <View>
          <Vcode
            value={vcodeText}
            onChangeText={value => this.setvcodeText(value)}
            onSubmitEditing={() => this.onVcodeSubmitEditing()}></Vcode>
        </View>

        <THButton
          style={{
            width: '100%',
            height: pxToDp(40),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: pxToDp(15),
          }}
          disabled={isCountDowning}
          // 注意下这里绑定的事件
          onPress={() => this.phoneNumberSubmitEditing()}>
          {btnText}
        </THButton>
      </View>
    );
  }

  render() {
    // <Dialog.Loading />
    // console.log('this---', this);
    const {showLogin} = this.state;
    // console.log(Dimensions.get("window").height)
    return (
      <View>
        {/* 状态栏, 透明,图片直接已移动到了上面 */}
        <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
        {/* 背景图片, 200为安卓单位dp， px转dp */}
        <Image
          style={{width: '100%', height: pxToDp(200)}}
          source={require('../../../res/profileBackground.jpg')}></Image>

        {showLogin ? this.renderLogin() : this.renderVcode()}
      </View>
    );
  }
}

export default Index;
