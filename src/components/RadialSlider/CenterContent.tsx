import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import type { CenterContentProps } from './types';

const CenterContent = (props: CenterContentProps) => {
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
    unitValueContentStyle,
  } = props;

  return (
    <View style={[styles.hideCenterContent, centerContentStyle]}>
      {!isHideTitle && (
        <Text style={[styles.helperText, styles.subTitleWidth, titleStyle]}>
          {title}
        </Text>
      )}
      {!isHideValue && (
        <View style={[styles.hideValue, unitValueContentStyle]}>
          <Text style={[styles.valueText, styles.large_header, valueStyle]}>
            {value}
          </Text>
          <Text style={[styles.valueUnit, styles.helperText, unitStyle]}>
            {unit}
          </Text>
        </View>
      )}
      {!isHideSubtitle && (
        <Text style={[styles.helperText, styles.subTitleWidth, subTitleStyle]}>
          {subTitle}
        </Text>
      )}
    </View>
  );
};

export default CenterContent;
