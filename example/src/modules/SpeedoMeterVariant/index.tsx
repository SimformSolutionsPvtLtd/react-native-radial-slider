import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';
import VariantCard from '../../components/VariantCard';
import { Colors } from '../../theme';

interface actionButtonProps {
  backgroundColor: string;
  title: string;
  onPress: () => void;
}

const ActionButton = ({
  onPress,
  title,
  backgroundColor,
}: actionButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        {
          backgroundColor: backgroundColor,
        },
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const SpeedoMeterVariant = () => {
  const [speed, setSpeed] = useState(0);
  const [isStart, setIsStart] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(handleTime, 1000);
    return () => clearTimeout(timerId);
  });

  const handleTime = () => {
    isStart && setSpeed(prev => prev + 10);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <ActionButton
          backgroundColor={Colors.green}
          title="Start"
          onPress={() => setIsStart(true)}
        />
        <ActionButton
          backgroundColor={Colors.red}
          title="Stop"
          onPress={() => setIsStart(false)}
        />
      </View>
      <VariantCard>
        <RadialSlider
          variant={'speedometer'}
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
          variant={'speedometer-marker'}
          value={speed}
          min={0}
          max={200}
          onChange={setSpeed}
          lineColor={Colors.darkGrey}
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    color: Colors.white,
    fontWeight: '900',
  },
});

export default SpeedoMeterVariant;
