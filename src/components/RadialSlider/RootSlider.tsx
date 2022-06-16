import React from 'react';
import Constants from '../../constants';
import RadialSlider from './RadialSlider';
import SpeedoMeter from './SpeedoMeter';
import type { RootSliderProps } from './types';

const RootSlider = (props: RootSliderProps) => {
  const { variant } = props;

  return variant === Constants.speedoMeterMarker ||
    variant === Constants.speedometer ? (
    <SpeedoMeter {...props} />
  ) : (
    <RadialSlider {...props} />
  );
};

export default RootSlider;
