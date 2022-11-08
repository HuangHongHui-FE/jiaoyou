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
export default class Index extends Component {
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
    let res = await Geo.getCityByLocation();
    console.log('GeoRes--->', res);
    const address = res.regeocode.formatted_address;
    const city = res.regeocode.addressComponent.city.replace('市', '');
    this.setState({
      address,
      city,
    });
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

  chooseGender(gender){
    this.setState({
      gender
    })
  }

  // 点击选择生日
  chooseDate() {
    this.setState({
      showDateTimePicker: true,
    });
  }

  // 展示城市选择框
  showCityPiker() {
    console.log('选择城市')
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
  chooseHeadImg(){

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
            <Input placeholder="设置生日" value={birthday} onTouchStart={() => this.chooseDate()}></Input>
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
