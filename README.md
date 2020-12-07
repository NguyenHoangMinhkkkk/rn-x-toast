# rn-x-toast

## Getting started
`$ yarn add rn-x-toast`
## IOS linking
`$ cd ios && pod install`
## ReBuild 

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
