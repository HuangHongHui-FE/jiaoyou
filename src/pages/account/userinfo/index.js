import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';

import SvgUri from 'react-native-svg-uri';

// 男女svg显示
import {maleSvg} from '../../../res/fonts/iconSvg';
// 日期组件
import DateTimePicker from '@react-native-community/datetimepicker';

import Geo from '../../../utils/Geo';

import {Input} from '@rneui/base';

// import Picker from 'react-native-picker';
import THButton from '../../../components/THButton';
import CityJson from '../../../res/citys.json';

import ImagePicker from 'react-native-image-crop-picker';

import {inject, observer} from 'mobx-react';
import request from '../../../utils/request';
import {ACCOUNT_CHECKHEADIMAGE, ACCOUNT_BEGINFO} from '../../../utils/pathMap';

@inject('RootStore')
@observer
class Index extends Component {
  state = {
    // 用户信息
    nickname: '张山',
    gender: '男',
    birthday: '2019-12-26',
    city: '广州',
    header: '/upload/13828459787.jpg',
    lng: '',
    lat: '',
    address: '',
    date: new Date(),

    // 是否显示日期组件
    showDateTimePicker: false,
  };

  async componentDidMount() {
    console.log('userinfo----', this.props);
    let res = await Geo.getCityByLocation();
    console.log('GeoRes--->', res);
    const address = res.regeocode.formatted_address;
    const city = res.regeocode.addressComponent.city.replace('市', '');
    const lng =
      res.regeocode.addressComponent.streetNumber.location.split(',')[0];
    const lat =
      res.regeocode.addressComponent.streetNumber.location.split(',')[1];
    this.setState({address, city, lng, lat});
  }

  // 日期改变事件
  handleDateChange(event, date) {
    console.log(event, date);
    //这是设置日期,即确认按钮
    if (event.type == 'set') {
      const birthday = this.dateToString(date);
      this.setState({birthday, showDateTimePicker: false});
    } else {
      //这是点击取消按钮
      this.setState({showDateTimePicker: false});
    }
  }

  // 点击矢量图
  chooseGender(gender) {
    this.setState({
      gender,
    });
  }

  // 点击选择生日
  chooseDate() {
    this.setState({
      showDateTimePicker: true,
    });
  }

  // 展示城市选择框
  showCityPiker() {
    console.log('选择城市');
    // Picker.init({
    //   pickerData: CityJson,
    //   selectedValue: ['北京', '北京'],
    //   wheelFlex: [1, 1, 0],
    //   pickerConfirmBtnText: '确定',
    //   pickerCancelBtnText: '取消',
    //   pickerTitleText: '选择城市',
    //   onPickerConfirm: data => {
    //     console.log(data);
    //     this.setState({
    //       city: data[1]
    //     })
    //   },
    //   onPickerCancel: data => {
    //     console.log(data);
    //   },
    //   onPickerSelect: data => {
    //     console.log(data);
    //   },
    // });
  }

  dateToString(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    if (day.length == 1) {
      day = '0' + day;
    }
    if (month.length == 1) {
      month = '0' + month;
    }
    var dateTime = year + '-' + month + '-' + day;
    return dateTime;
  }

  // 点击设置头像
  chooseHeadImg() {
    const {nickname, city, birthday} = this.state;
    if (!nickname || !city || !birthday) {
      console.log('不合法'); //
      return;
    }
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      console.log('userinfi---image----', image);

      let formData = new FormData();
      formData.append('headPhoto', {
        // 本地圖片地址
        uri: image.path,
        type: image.mime,
        name: image.path.split('').pop(),
      });
      // 头像上传
      // !!!!停止debug模式
      const res0 = await request.post(ACCOUNT_CHECKHEADIMAGE, formData, {
        header: {
          'Content-Type': 'multipart/form-data',

          // token不用每次都加了
          // "Authorization": `Bearer ${this.props.RootStore.token}`
        },
      });

      console.log(res0);
      // {
      //   code: '10000',
      //   data: {
      //     headImgPath: "/upload/15915912346.jpg",
      //     headImgShortPath: "/upload/15915912346.jpg",
      //     isPass: true
      //   },
      //   msg: "上传成功"
      // }

      if (res0.code !== '10000') {
        return;
      }

      // 构造参数，完成个人信息
      let params = this.state;
      params.header = res[0].data.headImgPath;
      console.log('userinfo---params', params);

      const res1 = await request.privatePost(ACCOUNT_BEGINFO, params);
      console.log(res1);
    });
  }

  render() {
    const {gender, nickname, date, birthday, showDateTimePicker, city} =
      this.state;

    return (
      <View style={{backgroundColor: '#fff', flex: 1, padding: pxToDp(20)}}>
        <Text style={{fontSize: pxToDp(20), color: '#666', fontWeight: 'bold'}}>
          填写资料
        </Text>
        <Text style={{fontSize: pxToDp(20), color: '#666', fontWeight: 'bold'}}>
          提升个人魅力
        </Text>

        {/* 性别的图标svg */}
        <View
          style={{
            marginTop: pxToDp(20),
            width: '60%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => this.chooseGender('男')}
            style={{
              width: pxToDp(60),
              height: pxToDp(60),
              borderRadius: pxToDp(30),
              backgroundColor: gender == '男' ? 'red' : '#eee',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgUri width="40" height="40" svgXmlData={maleSvg} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.chooseGender('女')}
            style={{
              width: pxToDp(60),
              height: pxToDp(60),
              borderRadius: pxToDp(30),
              backgroundColor: gender == '女' ? 'red' : '#eee',
              justifyContent: 'center',
              alignItems: 'center',
              alignItems: 'center',
            }}>
            <SvgUri width="40" height="40" svgXmlData={maleSvg} />
          </TouchableOpacity>
        </View>

        {/* 昵称 */}
        <View>
          <Input
            placeholder="设置昵称"
            value={nickname}
            onChangeText={nickname => this.setState({nickname})}
          />
        </View>

        {/* 日期 */}
        <View>
          <View>
            {/*  onFocus={() => this.chooseDate()}   */}
            {/* <TouchableOpacity onPress={() => this.chooseDate()}>
              <Input placeholder="设置生日" value={birthday}></Input>
            </TouchableOpacity> */}
            <Input
              placeholder="设置生日"
              value={birthday}
              onTouchStart={() => this.chooseDate()}></Input>
          </View>
          {showDateTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              minimumDate={new Date(2000, 0, 1)}
              maximumDate={new Date()}
              display="spinner"
              onChange={(event, date) => this.handleDateChange(event, date)}
            />
          )}
        </View>
        {/* 地址定位 */}
        <TouchableOpacity onPress={() => this.showCityPiker()}>
          <Input
            value={'当前定位:' + city}
            inputStyle={{color: '#666'}}></Input>
        </TouchableOpacity>

        {/* 头像 */}
        <THButton
          onPress={() => this.chooseHeadImg()}
          style={{
            height: pxToDp(40),
            borderRadius: pxToDp(20),
            alignSelf: 'center',
          }}>
          选择头像
        </THButton>
      </View>
    );
  }
}

export default Index;
