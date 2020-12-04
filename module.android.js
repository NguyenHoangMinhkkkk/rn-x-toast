import { NativeModules } from 'react-native';

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
          return { message, duration, position };
      },
  };
};

const ShowToastAndroid = function (
  position: PositionType = 'CENTER', 
  message: string, 
  duration: DurationType  = 'DEFAULT',
) {
  try {
    NativeModules.EdToast.show(
      AndroidToastOptionsBuilder()
      .withMessage(message || 'Thông báo')
      .withDuration(duration || 'DEFAULT')
      .withPosition(position || 'CENTER')
      .build()
    );
  } catch (error) {
    console.warn('Something went wrong with EdToast :3', error)
  }
};

export default {
  showToastTop: (message: string, duration: DurationType = 'DEFAULT') => ShowToastAndroid('TOP', message, duration),
  showToastCenter: (message: string, duration: DurationType = 'DEFAULT') => ShowToastAndroid('CENTER', message, duration),
  showToastBottom: (message: string, duration: DurationType = 'DEFAULT') => ShowToastAndroid('BOTTOM', message, duration),
};
