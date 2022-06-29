import React from 'react';
import type { MarkerValueContentProps } from './types';
import { G, Text as SVGText } from 'react-native-svg';
import { useRadialSlider } from './hooks';

const MarkerValueContent = (props: MarkerValueContentProps) => {
  const {
    radius = 100,
    thumbBorderWidth = 5,
    min = 0,
    max = 100,
    markerValue,
    fixedMarker = false,
    markerValueInterval = 10,
    value,
    markerValueColor,
  } = props;

  const { lineHeight, lineCount, angle, marks, centerValue } =
    useRadialSlider(props);

  return (
    <>
      {marks.map((mark: { value: number }, index: number) => {
        const markIndex = Math.floor(
          (((((!fixedMarker ? (markerValue as number) : (value as number)) -
            min) *
            100) /
            (max - min)) *
            lineCount) /
            100
        );

        const maxCount = (lineCount / max) as number;

        const markerInnerValue = Math.round(
          (max / markerValueInterval) as number
        );

        // if number is below 99(two digit number) then we set -2 for x property in svg Text
        const twoDigitsPositionValue = max < 99 ? -2 : -3;

        const getTransformValue = () => {
          return `rotate(92) translate(${twoDigitsPositionValue})`;
        };

        const getTextPositionValue = (type: string) => {
          if (mark?.value < centerValue) {
            return type === 'x' ? '0' : '-85';
          } else {
            return type === 'x' ? twoDigitsPositionValue : '-85';
          }
        };

        return (
          <G key={index.toString()}>
            {(index % markerInnerValue === 0 || index === markIndex) && (
              <G
                transform={`translate(${
                  radius + (lineHeight - thumbBorderWidth)
                }, ${radius + (lineHeight - thumbBorderWidth)})  `}>
                <SVGText
                  transform={`rotate(${
                    index * maxCount + 87 + angle
                  })  ${getTransformValue()} `}
                  x={getTextPositionValue('x')}
                  y={getTextPositionValue('y')}
                  fill={markerValueColor}
                  children={mark?.value ?? 0}
                />
              </G>
            )}
          </G>
        );
      })}
    </>
  );
};

export default MarkerValueContent;
