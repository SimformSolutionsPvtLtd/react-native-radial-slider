import React, { useMemo } from 'react';
import type { SpeedoMeterProps } from './types';
import type { defaultSpeedoMeterProps } from './SpeedometerDefaultProps';
import { G, Text as SVGText } from 'react-native-svg';
import { useRadialSlider } from './hooks';

const MarkerValueContent = (
  props: SpeedoMeterProps & typeof defaultSpeedoMeterProps
) => {
  const {
    step,
    radius,
    thumbBorderWidth,
    min,
    max,
    markerValue,
    dynamicMarker,
    fixedMarker,
    markerValueInterval,
    value,
    markerValueColor,
  } = props;

  const { lineHeight, lineCount, angle } = useRadialSlider(props);

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

  return (
    <>
      {marks.map((mark, index) => {
        const markIndex = Math.floor(
          (((((!dynamicMarker
            ? fixedMarker
              ? (value as number)
              : (markerValue as number)
            : value) -
            min) *
            100) /
            (max - min)) *
            lineCount) /
            100
        );

        const maxCount = (lineCount / max) as number;

        const markerInnerValue = (max / markerValueInterval) as number;

        const centerValue = Math.round((max - min) / 2) as number;

        const getTransformValue = () => {
          // @ todo : add a prop to transform
          // if (mark?.value === centerValue) {
          // return `rotate(185) translate(-5)`
          // }

          if (mark?.value <= centerValue) {
            return `rotate(95) translate(-10)`;
          } else {
            return `scale(1,1)`;
          }
        };

        const getTextPositionValue = (type: string) => {
          // @ todo : add a prop to transform
          // if (mark?.value === centerValue) {
          //   return type === 'x' ? '-100' : '5';
          // }

          if (mark?.value <= centerValue) {
            return type === 'x' ? '0' : '-90';
          } else {
            return type === 'x' ? '85' : '10';
          }
        };

        return (
          <G key={index.toString()}>
            {(index % markerInnerValue === 0 || index === markIndex) && (
              <G
                transform={`translate(${
                  radius + (lineHeight - thumbBorderWidth)
                }, ${radius + (lineHeight - thumbBorderWidth)})  `}>
                {mark.isEven && (
                  <SVGText
                    transform={`rotate(${
                      index * maxCount + 87 + angle
                    })  ${getTransformValue()} `}
                    x={getTextPositionValue('x')}
                    y={getTextPositionValue('y')}
                    fill={markerValueColor}
                    children={mark?.value ?? 0}
                  />
                )}
              </G>
            )}
          </G>
        );
      })}
    </>
  );
};

export default MarkerValueContent;
