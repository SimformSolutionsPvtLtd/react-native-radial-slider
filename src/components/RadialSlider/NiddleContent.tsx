import React from 'react';
import { useRadialSlider } from './hooks';
import type { RadialSliderProps } from './types';
import { Circle, G, Polygon } from 'react-native-svg';
import type { defaultProps } from './SliderDefaultProps';

const NiddleContent = (props: RadialSliderProps & typeof defaultProps) => {
  const {
    radius,
    min,
    max,
    markerCircleSize,
    markerCircleColor,
    markerPositionY,
    markerPositionX,
    niddleBackgroundColor,
    niddleColor,
    niddleBorderWidth,
    niddleHeight,
  } = props;

  const { lineCount, lines } = useRadialSlider(props);

  return (
    <>
      {lines.map(_value => {
        const activeIndex =
          ((((props.value - min) * 100) / (max - min)) * lineCount) / 100;

        return (
          <G
            key={_value}
            transform={`rotate(${activeIndex - 120}, ${radius}, ${radius})`}
            x={markerPositionX}
            y={markerPositionY}>
            <Circle
              r={markerCircleSize}
              cx={radius}
              cy={radius}
              fill={markerCircleColor}
            />
            <Polygon
              points={`97, 118 103, 118 100, ${niddleHeight}`}
              fill={niddleBackgroundColor}
              strokeWidth={niddleBorderWidth}
              stroke={niddleColor}
              strokeLinejoin={'round'}
            />
          </G>
        );
      })}
    </>
  );
};

export default NiddleContent;
