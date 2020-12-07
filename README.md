# react-native-ed-toast

## Getting started

`$ npm install react-native-ed-toast --save`

### Mostly automatic installation

`$ react-native link react-native-ed-toast`

## Usage
```javascript
import React from 'react'
import {TouchableOpacity} from 'react-native'
import Toast from 'react-native-ed-toast';

type DurationType = 'LONG' | 'DEFAULT' | 'SHORT'
/*
  Duration(seconds) of IOS toast is LONG = 5, DEFAULT = 3, SHORT = 2
  Duration(seconds) of ANDROID toast: LONG = DEFAULT = 3.5, SHORT = 2 
*/

function SomeComponent() {

  const DoToast = () => {
    Toast.showToastCenter('Toast some message in the center', 'LONG');
    // Toast.showToastTop();
    // Toast.showToastBottom();
  }

  return (
    <TouchableOpacity>
      <Text>PressMeToToast</Text>
    </TouchableOpacity>
  )
}
```
