module.exports = {
  plugins: [

    // mobx引入时的配置
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
