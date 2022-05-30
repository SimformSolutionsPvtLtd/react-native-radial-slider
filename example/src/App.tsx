import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RadialSlider, SpeedoMeter } from 'react-native-radial-slider';

const App = () => {
  const [speed, setSpeed] = useState(0);

  return (
    <SpeedoMeter
      value={speed}
      min={0}
      style={styles.radial}
      max={200}
      onChange={setSpeed}
    />
  );
};

const styles = StyleSheet.create({
  radial: {
    marginTop: 100,
  },
});
export default App;
