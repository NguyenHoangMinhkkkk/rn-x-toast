"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const AndroidToastOptionsBuilder = function () {
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

const showToastIOS = (position = 'CENTER', message, duration = 'DEFAULT') => {
  const toastConfig = {
    message,
    duration,
    position
  };

  try {
    _reactNative.NativeModules.Toast.Show(toastConfig);
  } catch (error) {
    console.warn('Something went wrong with edoctor-toast', error);
  }
};

const ShowToastAndroid = function (position = 'CENTER', message, duration = 'DEFAULT') {
  try {
    _reactNative.NativeModules.Toast.show(AndroidToastOptionsBuilder().withMessage(message || 'Thông báo').withDuration(duration || 'DEFAULT').withPosition(position || 'CENTER').build());
  } catch (error) {
    console.warn('Something went wrong with edoctor-toast', error);
  }
};

const showToast = (position = 'CENTER', message, duration = 'DEFAULT') => {
  if (_reactNative.Platform.OS === 'android') {
    ShowToastAndroid(position, message, duration);
  } else if (_reactNative.Platform.OS === 'ios') {
    showToastIOS(position, message, duration);
  } else {
    console.warn('Warning: EdToast only works on android & ios');
  }
};

var _default = {
  showToastTop: (message, duration = 'DEFAULT') => showToast('TOP', message, duration),
  showToastCenter: (message, duration = 'DEFAULT') => showToast('CENTER', message, duration),
  showToastBottom: (message, duration = 'DEFAULT') => showToast('BOTTOM', message, duration)
};
exports.default = _default;
//# sourceMappingURL=index.js.map