import { NativeModules, Platform } from 'react-native';

type DurationType = 'LONG' | 'DEFAULT' | 'SHORT';
type PositionType = 'TOP' | 'CENTER' | 'BOTTOM';

type ToastConfigType = {
  message: string;
  duration?: DurationType;
  position?: PositionType;
};

const AndroidToastOptionsBuilder = function () {
  let message = '';
  let duration = 'SHORT';
  let position = 'CENTER';

  return {
    withMessage: function (m: string) {
      message = m;
      return this;
    },
    withDuration: function (d: DurationType) {
      if (d === 'DEFAULT') duration = 'SHORT';
      else duration = d;
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

const showToastIOS = (
  position: PositionType = 'CENTER',
  message: string,
  duration: DurationType = 'DEFAULT'
) => {
  const toastConfig: ToastConfigType = { message, duration, position };

  try {
    NativeModules.Toast.Show(toastConfig);
  } catch (error) {
    console.warn('Something went wrong with edoctor-toast', error);
  }
};

const ShowToastAndroid = function (
  position: PositionType = 'CENTER',
  message: string,
  duration: DurationType = 'DEFAULT'
) {
  try {
    NativeModules.Toast.show(
      AndroidToastOptionsBuilder()
        .withMessage(message || 'Thông báo')
        .withDuration(duration || 'DEFAULT')
        .withPosition(position || 'CENTER')
        .build()
    );
  } catch (error) {
    console.warn('Something went wrong with edoctor-toast', error);
  }
};

const showToast = (
  position: PositionType = 'CENTER',
  message: string,
  duration: DurationType = 'DEFAULT'
) => {
  if (Platform.OS === 'android') {
    ShowToastAndroid(position, message, duration);
  } else if (Platform.OS === 'ios') {
    showToastIOS(position, message, duration);
  } else {
    console.warn('Warning: EdToast only works on android & ios');
  }
};

export default {
  showToastTop: (message: string, duration: DurationType = 'DEFAULT') =>
    showToast('TOP', message, duration),
  showToastCenter: (message: string, duration: DurationType = 'DEFAULT') =>
    showToast('CENTER', message, duration),
  showToastBottom: (message: string, duration: DurationType = 'DEFAULT') =>
    showToast('BOTTOM', message, duration),
};
