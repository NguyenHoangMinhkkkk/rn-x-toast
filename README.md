# rn-x-toast
Toast component for both platform Android and iOS.  
Using [scalessec/Toast](https://github.com/scalessec/Toast) on iOS
and [android.widget.Toast](https://developer.android.com/reference/android/widget/Toast) on Android.

# Thanks
This project inspired by **scalessec/Toast**, **remobile/react-native-toast**

## Getting started
`$ yarn add rn-x-toast`
## IOS linking
`$ cd ios && pod install`
## ReBuild 
`$ npx react-native run-ios`

`$ npx react-native run-android`

## Usage
```javascript
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Toast from 'rn-x-toast';

type DurationType = 'LONG' | 'DEFAULT' | 'SHORT'
/*
  Duration(seconds) of IOS toast is LONG = 3.5, DEFAULT = 2, SHORT = 1
  Duration(seconds) of ANDROID toast: LONG = 3.5, DEFAULT = SHORT = 2 
*/

function SomeComponent() {

  const doToast = () => {
    Toast.showToastCenter('Toast some message in the center', 'LONG');
    // Toast.showToastTop();
    // Toast.showToastBottom();
  }

  return (
    <TouchableOpacity onPress={doToast}>
      <Text>Press Me To Toast</Text>
    </TouchableOpacity>
  )
}

export default SomeComponent
```

## Features requested:
`- Toast on IOS with small icon/image on the head-left of message`

`- Toast message can be use with fontstyle/fontsize/fontweight/fontfamily/...otherTextStyles`
