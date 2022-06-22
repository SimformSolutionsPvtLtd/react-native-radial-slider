import React from 'react';
import Constants from '../../constants';
import RadialSlider from './RadialSlider';
import SpeedoMeter from './SpeedoMeter';
import type { RootSliderProps, SpeedoMeterProps } from './types';
import type { defaultSpeedoMeterProps } from './SpeedometerDefaultProps';

const RootSlider = (props: RootSliderProps) => {
  const { variant } = props;

  return variant === Constants.speedoMeterMarker ||
    variant === Constants.speedometer ? (
    <SpeedoMeter
      {...(props as SpeedoMeterProps & typeof defaultSpeedoMeterProps)}
    />
  ) : (
    <RadialSlider {...props} />
  );
};

export default RootSlider;
