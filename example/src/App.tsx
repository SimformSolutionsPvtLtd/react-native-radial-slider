import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RadialSlider, SpeedoMeter } from 'react-native-radial-slider';
import { colors } from './theme';

const App = () => {
  const [speed, setSpeed] = useState(100);

  return (
    <SpeedoMeter
      value={speed}
      markerValue={-1}
      min={0}
      style={styles.radial}
      max={200}
      subTitle={'Speedometer'}
      needleBackgroundColor={'url(#gradient)'}
      unit={' MB/S'}
      linearGradient={[
        { stop: '0%', color: colors.skyBlue },
        { stop: '100%', color: colors.darkBlue },
      ]}
      onChange={setSpeed}
      type="speedometer-marker"
    />
  );
};

const styles = StyleSheet.create({
  radial: {
    marginTop: 100,
  },
});
export default App;
