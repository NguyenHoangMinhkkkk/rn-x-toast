import { NativeModules } from 'react-native';

type DurationType = 'LONG' | 'DEFAULT' | 'SHORT'
type PositionType = 'TOP' | 'CENTER' | 'BOTTOM'

type ToastConfigType = {
  message: string,
  duration?: DurationType,
  position?: PositionType,
}

const showToastIOS = (
  position: PositionType = 'CENTER',
  message: string,
  duration: DurationType  = 'DEFAULT', 
) => {
  const toastConfig: ToastConfigType = { message, duration, position };

  try {
    NativeModules.EdToast.Show(toastConfig);
  } catch (error) {
    console.warn("some thing went wrong with EdToast :3", error)
  }
};

export default {
  showToastTop: (message: string, duration: DurationType = 'DEFAULT') => showToastIOS('TOP', message, duration),
  showToastCenter: (message: string, duration: DurationType = 'DEFAULT') => showToastIOS('CENTER', message, duration),
  showToastBottom: (message: string, duration: DurationType = 'DEFAULT') => showToastIOS('BOTTOM', message, duration),
};
