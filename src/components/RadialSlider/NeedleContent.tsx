import React from 'react';
import { useRadialSlider } from './hooks';
import type { NeedleContentProps } from './types';
import { Circle, G, Polygon } from 'react-native-svg';

const NeedleContent = (props: NeedleContentProps) => {
  const {
    radius = 100,
    min = 0,
    max = 100,
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
          (((((props?.value as number) - min) * 100) / (max - min)) *
            lineCount) /
          100;

        const needleRotation = activeIndex < 50 ? 122 : 119;

        const circleSize =
          Math.round(radius / (markerCircleSize as number)) * 2;

        const dynamicNeedleHeight =
          (((needleHeight as number) / radius) as number) * 100 + 5;

        return (
          <G
            key={_value}
            transform={`rotate(${
              activeIndex - needleRotation
            }, ${radius}, ${radius})`}
            x={markerPositionX}
            y={markerPositionY}>
            <Circle
              r={circleSize}
              cx={radius}
              cy={radius}
              fill={markerCircleColor}
            />
            <Polygon
              points={`97, 118 103, 118 100, ${dynamicNeedleHeight}`}
              x={radius - 100}
              y={radius - 100}
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
