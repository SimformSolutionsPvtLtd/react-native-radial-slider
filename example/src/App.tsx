import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';
import { colors } from './theme';

const App = () => {
  const [speed, setSpeed] = useState(100);

  return (
    <RadialSlider
      value={speed}
      markerValue={-1}
      min={0}
      style={styles.radial}
      max={300}
      subTitle={'Speedometer'}
      unit={' MB/S'}
      linearGradient={[{ stop: '100%', color: colors.darkBlue }]}
      onChange={setSpeed}
      isHideSlider
      isHideButtons
    />
  );
};

const styles = StyleSheet.create({
  radial: {
    marginTop: 100,
  },
});
export default App;
