// 设计稿宽度 / 元素宽度  == 设备宽度 /  设备中元素宽度
// 设备中元素宽度 = 设备宽度 * 元素宽度 / 设备宽度
// PX转DP
import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const pxToDp = (elePx) => {
    return screenWidth * elePx / 375;
}