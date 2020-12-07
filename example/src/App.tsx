import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-toast';

export default function App() {
  const [state, setState] = React.useState(0);
  const toastSomeThing = () => {
    Toast.showToastCenter(
      'toast nenenernajsdjahsdj ahsjdh zxjczjxhcj' + state.toString()
    );
    setState(state + 1);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toastSomeThing}>
      <Text>Toast Here</Text>
      <Text>Toast Here</Text>
      <Text>Toast Here</Text>
      <Text>Toast Here</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
