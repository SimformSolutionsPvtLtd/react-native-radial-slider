import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import {
  createRange,
  getExtraSize,
  polarToCartesian,
} from '../../../utils/commonHelpers';

interface Props {
  step: number;
  radius: number;
  sliderWidth: number;
  openingRadian: number;
  thumbRadius: number;
  thumbBorderWidth: number;
  disabled: boolean;
  min: number;
  onChange: Function;
  max: number;
  onComplete: Function;
  value: number;
  letIconStyle?: StyleProp<ViewStyle>;
  rightIconStyle?: StyleProp<ViewStyle>;
}

const useRadialSlider = (props: Props) => {
  const {
    radius,
    sliderWidth,
    openingRadian,
    thumbRadius,
    thumbBorderWidth,
    min,
    letIconStyle,
    disabled,
    value,
    rightIconStyle,
    max,
  } = props;

  const angle = (openingRadian * 180.0) / Math.PI;

  const lineCount = (360 - angle * 2) as number;

  const lines = createRange(min, lineCount + min, 1);

  const svgSize =
    radius * 2 + getExtraSize(sliderWidth, thumbRadius, thumbBorderWidth);

  const containerRef = React.createRef();

  const lineHeight =
    getExtraSize(sliderWidth, thumbRadius, thumbBorderWidth) / 2 +
    thumbBorderWidth;

  const startRadian = 2 * Math.PI - openingRadian;

  const startPoint = polarToCartesian(
    startRadian,
    radius,
    sliderWidth,
    thumbRadius,
    thumbBorderWidth
  );

  const endPoint = polarToCartesian(
    openingRadian,
    radius,
    sliderWidth,
    thumbRadius,
    thumbBorderWidth
  );

  const leftButtonStyle = StyleSheet.flatten([
    letIconStyle,
    (disabled || min === value) && {
      opacity: 0.5,
    },
  ]);

  const rightButtonStyle = StyleSheet.flatten([
    rightIconStyle,
    (disabled || max === value) && {
      opacity: 0.5,
    },
  ]);

  return {
    angle,
    lineCount,
    lines,
    svgSize,
    containerRef,
    lineHeight,
    startPoint,
    endPoint,
    startRadian,
    leftButtonStyle,
    rightButtonStyle,
  };
};

export default useRadialSlider;
