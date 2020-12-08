import { NativeModules, Platform } from 'react-native';

const _androidToastOptionsBuilder = function () {
  let message = '';
  let duration = 'SHORT';
  let position = 'CENTER';
  return {
    withMessage: function (m) {
      message = m;
      return this;
    },
    withDuration: function (d) {
      if (d === 'DEFAULT') duration = 'SHORT';else duration = d;
      return this;
    },
    withPosition: function (p) {
      position = p;
      return this;
    },
    build: function () {
      return {
        message,
        duration,
        position
      };
    }
  };
};

const _showToastIOS = (position = 'CENTER', message, duration = 'DEFAULT') => {
  const toastConfig = {
    message,
    duration,
    position
  };

  try {
    NativeModules.Toast.Show(toastConfig);
  } catch (error) {
    console.warn('Something went wrong with rn-x-toast', error);
  }
};

const _showToastAndroid = function (position = 'CENTER', message, duration = 'DEFAULT') {
  try {
    NativeModules.Toast.show(_androidToastOptionsBuilder().withMessage(message || 'Thông báo').withDuration(duration || 'DEFAULT').withPosition(position || 'CENTER').build());
  } catch (error) {
    console.warn('Something went wrong with rn-x-toast', error);
  }
};

const _showToast = (position = 'CENTER', message, duration = 'DEFAULT') => {
  if (Platform.OS === 'android') {
    _showToastAndroid(position, message, duration);
  } else if (Platform.OS === 'ios') {
    _showToastIOS(position, message, duration);
  } else {
    console.warn('Warning: This module only works on android & ios');
  }
};

export default {
  showToastTop: (message, duration = 'DEFAULT') => _showToast('TOP', message, duration),
  showToastCenter: (message, duration = 'DEFAULT') => _showToast('CENTER', message, duration),
  showToastBottom: (message, duration = 'DEFAULT') => _showToast('BOTTOM', message, duration)
};
//# sourceMappingURL=index.js.map