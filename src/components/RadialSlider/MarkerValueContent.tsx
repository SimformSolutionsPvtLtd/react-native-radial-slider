import React, { useMemo } from 'react';
import type { SpeedometerProps } from './types';
import type { defaultSpeedoMeterProps } from './SpeedometerDefaultProps';
import { G, Text as SVGText } from 'react-native-svg';
import { useRadialSlider } from './hooks';

const MarkerValueContent = (
  props: SpeedometerProps & typeof defaultSpeedoMeterProps
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

        return (
          <G key={index.toString()}>
            {(index % markerInnerValue === 0 || index === markIndex) && (
              <G
                transform={`translate(${
                  radius + (lineHeight - thumbBorderWidth)
                }, ${radius + (lineHeight - thumbBorderWidth)})`}>
                {mark.isEven && (
                  <SVGText
                    transform={`rotate(${index * maxCount + 85 + angle})`}
                    x="85"
                    y="10"
                    fill={markerValueColor}
                    children={mark.value}
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
