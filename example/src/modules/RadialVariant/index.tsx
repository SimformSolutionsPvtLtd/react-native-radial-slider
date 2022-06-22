import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';
import { Colors } from '../../theme';
import VariantCard from '../../components/VariantCard';

const RadialVariant = () => {
  const [speed, setSpeed] = useState(0);

  return (
    <View style={styles.container}>
      <VariantCard>
        <RadialSlider
          value={speed}
          min={0}
          max={200}
          onChange={setSpeed}
          lineColor={Colors.darkGrey}
          sliderTrackColor={Colors.darkGrey}
        />
      </VariantCard>
      <VariantCard>
        <RadialSlider
          variant={'radial-circle-slider'}
          value={speed}
          min={0}
          max={200}
          lineColor={Colors.darkGrey}
          sliderTrackColor={Colors.darkGrey}
          onChange={setSpeed}
        />
      </VariantCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default RadialVariant;
