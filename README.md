## react-native交友项目

安装react-native的cli

npm i -g react-native-cli

看全局包安装的目录

npm root -g

手机投屏里alt+M查看全部操作；
debug可以看见浏览器输出

### 项目创建

```js
npx react-native init jiaoyou
npx react-native run-android  || npm run android
```

##### react navigation搭建路由
react-navigation
https://www.reactnavigation.org.cn/docs/guide-quick-start

```
yarn add @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-reanimated react-native-gesture-handler @react-native-community/masked-view
```

#### px转dp
在src/utils/stylesKits.js里

样式写双冒号


#### react-native-elements
注意要重启
基本
https://reactnativeelements.com/docs/installation
图标
https://github.com/oblador/react-native-vector-icons#installation



#### teaset做axios的请求loading

https://github.com/rilyu/teaset/blob/master/docs/cn/README.md

```
yarn add teaset    不维护了已经，很多报错
```



埋坑：

```
    console.log(ReactDOM.render(<Dialog.Loading />, document.getElementById('root')))
    import {Input, Icon, Dialog} from '@rneui/themed';
    <Dialog isVisible={visibleDialogLoading} onBackdropPress={() => this.toggleDialogLoading()}>
        <Dialog.Loading />
    </Dialog>
```



## error
```js
TypeError: Restricted in strict mode, js engine: hermes
解决：axios版本降级，1.X及以上的都不可以，0.27.2可以
```