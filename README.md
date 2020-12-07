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
  Duration(seconds) of IOS toast is LONG = 5, DEFAULT = 3, SHORT = 2
  Duration(seconds) of ANDROID toast: LONG = DEFAULT = 3.5, SHORT = 2 
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
