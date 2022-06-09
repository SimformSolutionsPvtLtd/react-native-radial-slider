import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  createRange,
  getExtraSize,
  polarToCartesian,
} from '../../../utils/commonHelpers';
import type { RadialSliderProps } from '../types';
import type { defaultProps } from '../SliderDefaultProps';
import * as appConstants from '../../../constants/index';

const useRadialSlider = (props: RadialSliderProps & typeof defaultProps) => {
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
    variant,
    step,
  } = props;

  const isRadialCircleVariant = variant === appConstants.radialCircleSlider;

  const radianValue = isRadialCircleVariant ? 0.01 : openingRadian;

  const isMarkerVariant = variant === appConstants.speedoMeterMarker;

  const angle = (radianValue * 180.0) / Math.PI;

  const lineCount = (360 - angle * 2) as number;

  const lines = createRange(min, lineCount + min, 1);

  const svgSize =
    radius * 2 + getExtraSize(sliderWidth, thumbRadius, thumbBorderWidth);

  const containerRef = React.createRef();

  const lineHeight =
    getExtraSize(sliderWidth, thumbRadius, thumbBorderWidth) / 2 +
    thumbBorderWidth;

  const startRadian = 2 * Math.PI - radianValue;

  const startPoint = polarToCartesian(
    startRadian,
    radius,
    sliderWidth,
    thumbRadius,
    thumbBorderWidth
  );

  const endPoint = polarToCartesian(
    radianValue,
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

  const marks = useMemo(() => {
    const stepsLength = Math.round((max - min) / step);

    return [...Array(stepsLength + 1)].map((_val, index) => {
      const isEven = index % 2 === 0;

      return {
        isEven,
        value: Math.round(index * step),
      };
    });
  }, [max, min, step]);

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
    radianValue,
    isMarkerVariant,
    marks,
    isRadialCircleVariant,
  };
};

export default useRadialSlider;
