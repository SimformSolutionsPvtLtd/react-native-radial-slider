import React, { useEffect, useMemo } from 'react';
import {
  createRange,
  getExtraSize,
  polarToCartesian,
} from '../../../utils/commonHelpers';
import type { RadialSliderHookProps } from '../types';
import Constants from '../../../constants';

const useRadialSlider = (props: RadialSliderHookProps) => {
  const {
    radius = 100,
    sliderWidth = 18,
    openingRadian = Math.PI / 3,
    thumbRadius = 18,
    thumbBorderWidth = 5,
    min = 0,
    max = 200,
    variant = 'default',
    step = 1,
    thumbPoint = 270,
  } = props;

  const centerValue = Math.round((max - min) / 2) as number;

  //For default variant in radial slider
  const isRadialSliderVariant = variant === Constants.radialSlider;

  //For radial-circle-slider variant
  const isRadialCircleVariant = variant === Constants.radialCircleSlider;

  //For speedometer-marker variant
  const isMarkerVariant = variant === Constants.speedoMeterMarker;

  //For speedometer variant
  const isSpeedoMeterVariant = variant === Constants.speedometer;

  const radianValue = isRadialCircleVariant ? 0.057 : openingRadian;

  useEffect(() => {
    if (isMarkerVariant)
      if (min < 0) {
        throw 'Negative number is not allowed';
      } else if (max < 0) {
        throw 'Negative number is not allowed';
      }
    if (max < min) {
      throw 'max value should be greater than min';
    }
  }, [isMarkerVariant, max, min]);

  const angle = (radianValue * 180.0) / Math.PI;

  const addRadialCircleCount = isRadialCircleVariant ? 6 : 0;

  const lineCount = (360 - angle * 2 + addRadialCircleCount) as number;

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
    thumbBorderWidth,
    thumbPoint,
    variant
  );

  const endPoint = polarToCartesian(
    radianValue,
    radius,
    sliderWidth,
    thumbRadius,
    thumbBorderWidth,
    thumbPoint,
    variant
  );

  const marks = useMemo(() => {
    if (isMarkerVariant) {
      const stepsLength = Math.round((max - min) / step);

      return [...Array(stepsLength + 1)].map((_val, index) => {
        const isEven = index % 2 === 0;

        return {
          isEven,
          value: Math.round(index * step),
        };
      });
    } else {
      const array: any = [];
      for (let i = 0; i <= max; i++) {
        array.push(i);
      }

      return array.map((index: number) => {
        const isEven = index % 2 === 0;

        return {
          isEven,
          value: Math.round(index * step),
        };
      });
    }
  }, [isMarkerVariant, max, min, step]);

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
    radianValue,
    isMarkerVariant,
    marks,
    isRadialCircleVariant,
    centerValue,
    isRadialSliderVariant,
    isSpeedoMeterVariant,
  };
};

export default useRadialSlider;
