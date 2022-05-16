import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import type { RadialSliderProps } from './types';

const StautsContent = (props: RadialSliderProps) => {
  const {
    statusTitle,
    statusValue,
    unit,
    statusContainerStyle,
    statusTitleStyle,
    statusValueStyle,
  } = props;

  return (
    <View style={[styles.statusView, statusContainerStyle]}>
      <Text style={[statusTitleStyle, styles.helperText]}>
        {statusTitle ?? ''}
      </Text>
      <View style={styles.hideStatus}>
        <Text
          style={[
            styles.statusValueText,
            statusValueStyle,
            styles.large_header,
          ]}>
          {statusValue?.toString() ?? ''}
        </Text>
        {statusValue?.toString() && (
          <Text style={[styles.statusValueUnit, styles.helperText]}>
            {unit}
          </Text>
        )}
      </View>
    </View>
  );
};

export default StautsContent;
