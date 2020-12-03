import { NativeModules, Platform } from 'react-native';

type DurationType = 'LONG' | 'DEFAULT' | 'SHORT'
type PositionType = 'TOP' | 'CENTER' | 'BOTTOM'

type ToastConfigType = {
  message: string,
  duration?: DurationType,
  position?: PositionType,
}

const AndroidToastOptionsBuilder = function () {
  let message = '';
  let duration = 'SHORT';
  let position = 'CENTER';
  let addPixelsY = 0;

  return {
      withMessage: function (m: string) {
          message = m;
          return this;
      },
      withDuration: function (d: DurationType) {
        if(d === 'DEFAULT') duration = 'SHORT';
        else duration = d;
        return this;
      },
      withPosition: function (p: PositionType) {
          position = p;
          return this;
      },
      build: function () {
          return {
              message,
              duration: duration,
              position: position,
              addPixelsY: addPixelsY,
          };
      },
  };
};

const ShowToastAndroid = function (ToastConfig: ToastConfigType) {
  NativeModules.EdToast.show(
    AndroidToastOptionsBuilder()
      .withMessage(ToastConfig.message || 'Thông báo')
      .withDuration(ToastConfig?.duration || 'DEFAULT')
      .withPosition(ToastConfig?.position || 'CENTER')
      .build()
  );
};

function ShowToastIOS(
  { message = 'Thông báo', duration = 'DEFAULT', position = 'CENTER' }: ToastConfigType
) {
  if (!message) return;
  
  const toastConfig: ToastConfigType = { message, duration, position };

  NativeModules.EdToast.Show(toastConfig);
}

const showToast = (
  position: PositionType = 'CENTER',
  message: string,
  duration: DurationType  = 'DEFAULT', 
) => {
  if (Platform.OS === 'ios') {
    ShowToastIOS({ position, duration, message });
  } else if (Platform.OS === 'android') {
    ShowToastAndroid({ position, duration, message });
  } else {
    console.log('Toast can be only using on IOS & Android');
  }
};

export default {
  showToastTop: (message: string, duration: DurationType = 'DEFAULT') => showToast('TOP', message, duration),
  showToastCenter: (message: string, duration: DurationType = 'DEFAULT') => showToast('CENTER', message, duration),
  showToastBottom: (message: string, duration: DurationType = 'DEFAULT') => showToast('BOTTOM', message, duration),
};
