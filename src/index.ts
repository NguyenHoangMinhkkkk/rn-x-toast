import { NativeModules, Platform } from 'react-native';

type DurationType = 'LONG' | 'DEFAULT' | 'SHORT';
type PositionType = 'TOP' | 'CENTER' | 'BOTTOM';

type ToastConfigType = {
  message: string;
  duration?: DurationType;
  position?: PositionType;
};

const _androidToastOptionsBuilder = function () {
  let message = '';
  let duration = 'SHORT';
  let position = 'CENTER';

  return {
    withMessage: function (m: string) {
      message = m;
      return this;
    },
    withDuration: function (d: DurationType) {
      duration = d;
      return this;
    },
    withPosition: function (p: PositionType) {
      position = p;
      return this;
    },
    build: function () {
      return { message, duration, position };
    },
  };
};

const _showToastIOS = (
  position: PositionType = 'CENTER',
  message: string,
  duration: DurationType = 'DEFAULT'
) => {
  const toastConfig: ToastConfigType = { message, duration, position };

  try {
    NativeModules.Toast.Show(toastConfig);
  } catch (error) {
    console.warn('Something went wrong with rn-x-toast', error);
  }
};

const _showToastAndroid = function (
  position: PositionType = 'CENTER',
  message: string,
  duration: DurationType = 'DEFAULT'
) {
  try {
    NativeModules.Toast.show(
      _androidToastOptionsBuilder()
        .withMessage(message || 'Thông báo')
        .withDuration(duration || 'DEFAULT')
        .withPosition(position || 'CENTER')
        .build()
    );
  } catch (error) {
    console.warn('Something went wrong with rn-x-toast', error);
  }
};

const _showToast = (
  position: PositionType = 'CENTER',
  message: string,
  duration: DurationType = 'DEFAULT'
) => {
  if (Platform.OS === 'android') {
    _showToastAndroid(position, message, duration);
  } else if (Platform.OS === 'ios') {
    _showToastIOS(position, message, duration);
  } else {
    console.warn('Warning: This module only works on android & ios');
  }
};

export default {
  showToastTop: (message: string, duration: DurationType = 'DEFAULT') =>
    _showToast('TOP', message, duration),
  showToastCenter: (message: string, duration: DurationType = 'DEFAULT') =>
    _showToast('CENTER', message, duration),
  showToastBottom: (message: string, duration: DurationType = 'DEFAULT') =>
    _showToast('BOTTOM', message, duration),
};
