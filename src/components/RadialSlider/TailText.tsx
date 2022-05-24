import React from 'react';
import { Text as SVGText, G, TSpan } from 'react-native-svg';
import type { defaultProps } from './SliderDefaultProps';
import { useRadialSlider } from './hooks';
import type { RadialSliderProps } from './types';
import { Colors } from '../../theme';

const TailText = (props: RadialSliderProps & typeof defaultProps) => {
  const { unit, min, max } = props;
  const { startPoint, endPoint } = useRadialSlider(props);

  return (
    <>
      <G transform={`translate(${-20}, ${40})`}>
        <SVGText fill={Colors.darkCharcoal} fontSize={12}>
          <TSpan x={startPoint.x} y={startPoint.y}>
            {`${min} ${unit}`}
          </TSpan>
        </SVGText>
      </G>
      <G transform={`translate(${-10}, ${40})`}>
        <SVGText fill={Colors.darkCharcoal} fontSize={12}>
          <TSpan x={endPoint.x} y={endPoint.y}>
            {`${max} ${unit}`}
          </TSpan>
        </SVGText>
      </G>
    </>
  );
};

export default TailText;
