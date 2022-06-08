import React from 'react';
import { useRadialSlider } from './hooks';
import type { SpeedoMeterProps } from './types';
import { Circle, G, Polygon } from 'react-native-svg';
import type { defaultSpeedoMeterProps } from './SpeedometerDefaultProps';

const NeedleContent = (
  props: SpeedoMeterProps & typeof defaultSpeedoMeterProps
) => {
  const {
    radius,
    min,
    max,
    markerCircleSize,
    markerCircleColor,
    markerPositionY,
    markerPositionX,
    needleBackgroundColor,
    needleColor,
    needleBorderWidth,
    needleHeight,
  } = props;

  const { lineCount, lines } = useRadialSlider(props);

  return (
    <>
      {lines.map(_value => {
        const activeIndex =
          ((((props.value - min) * 100) / (max - min)) * lineCount) / 100;

        const needleRotation = activeIndex < 50 ? 122 : 119;

        return (
          <G
            key={_value}
            transform={`rotate(${
              activeIndex - needleRotation
            }, ${radius}, ${radius})`}
            x={markerPositionX}
            y={markerPositionY}>
            <Circle
              r={markerCircleSize}
              cx={radius}
              cy={radius}
              fill={markerCircleColor}
            />
            <Polygon
              points={`97, 118 103, 118 100, ${needleHeight}`}
              fill={needleBackgroundColor}
              strokeWidth={needleBorderWidth}
              stroke={needleColor}
              strokeLinejoin={'round'}
            />
          </G>
        );
      })}
    </>
  );
};

export default NeedleContent;
