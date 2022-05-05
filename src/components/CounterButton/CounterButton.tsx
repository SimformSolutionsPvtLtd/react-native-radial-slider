import * as React from 'react';
import { Button, Text, View } from 'react-native';
import styles from './styles';
import type { CounterButtonProps } from './types';

export const updateCount = (input: number) => input + 1;

export const CounterButton = ({ label = 'Press Me' }: CounterButtonProps) => {
  const [count, setCount] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text>You pressed {count} times</Text>
      <Button onPress={() => setCount(updateCount(count))} title={label} />
    </View>
  );
};

export default CounterButton;
