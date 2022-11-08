import { Overlay } from 'react-native';
const Toast = Overlay.Toast;

const tmp = null
// Toast.showLoading = (text) => {
//   if (customKey) return;
//   tmp = Toast.show({
//     text,
//     icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
//     position: 'center',
//     duration: 1000000,
//   });
// }

// Toast.hideLoading = () => {
//   if (!tmp) return;
//   Toast.hide(tmp);
//   tmp = null;
// }

console.log(Toast)

export default Toast;