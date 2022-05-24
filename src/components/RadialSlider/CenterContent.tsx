import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import type { RadialSliderProps } from './types';

const CenterContent = (props: RadialSliderProps) => {
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
        <View
          style={[
            styles.hideValue,
            hideStyle,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              marginLeft: unit?.length ? unit?.length * 5 : 10,
            },
          ]}>
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
