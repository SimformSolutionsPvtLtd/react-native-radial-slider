import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import type { SpeedoMeterProps } from './types';

const CenterContent = (props: SpeedoMeterProps) => {
  const {
    title,
    subTitle,
    unit,
    titleStyle,
    subTitleStyle,
    valueStyle,
    unitStyle,
    isHideTitle,
    isHideSubtitle,
    isHideValue,
    value,
    centerContentStyle,
    hideStyle,
  } = props;

  return (
    <View style={[styles.hideCenterContent, centerContentStyle]}>
      {!isHideTitle && (
        <Text style={[titleStyle, styles.helperText]}>{title}</Text>
      )}
      {!isHideValue && (
        <View style={[styles.hideValue, hideStyle]}>
          <Text style={[styles.valueText, valueStyle, styles.large_header]}>
            {value}
          </Text>
          <Text style={[styles.valueUnit, unitStyle, styles.helperText]}>
            {unit}
          </Text>
        </View>
      )}
      {!isHideSubtitle && (
        <Text style={[subTitleStyle, styles.helperText, styles.subTitleWidth]}>
          {subTitle}
        </Text>
      )}
    </View>
  );
};

export default CenterContent;
