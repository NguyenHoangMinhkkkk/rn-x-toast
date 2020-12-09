"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

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
      duration = d;
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
    _reactNative.NativeModules.Toast.Show(toastConfig);
  } catch (error) {
    console.warn('Something went wrong with rn-x-toast', error);
  }
};

const _showToastAndroid = function (position = 'CENTER', message, duration = 'DEFAULT') {
  try {
    _reactNative.NativeModules.Toast.show(_androidToastOptionsBuilder().withMessage(message || 'Thông báo').withDuration(duration || 'DEFAULT').withPosition(position || 'CENTER').build());
  } catch (error) {
    console.warn('Something went wrong with rn-x-toast', error);
  }
};

const _showToast = (position = 'CENTER', message, duration = 'DEFAULT') => {
  if (_reactNative.Platform.OS === 'android') {
    _showToastAndroid(position, message, duration);
  } else if (_reactNative.Platform.OS === 'ios') {
    _showToastIOS(position, message, duration);
  } else {
    console.warn('Warning: This module only works on android & ios');
  }
};

var _default = {
  showToastTop: (message, duration = 'DEFAULT') => _showToast('TOP', message, duration),
  showToastCenter: (message, duration = 'DEFAULT') => _showToast('CENTER', message, duration),
  showToastBottom: (message, duration = 'DEFAULT') => _showToast('BOTTOM', message, duration)
};
exports.default = _default;
//# sourceMappingURL=index.js.map