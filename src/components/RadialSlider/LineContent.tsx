import { Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import type { RadialSliderProps } from './types';
import { G, Line } from 'react-native-svg';
import type { defaultProps } from './SliderDefaultProps';
import { useRadialSlider } from './hooks';

const LineContent = (props: RadialSliderProps & typeof defaultProps) => {
  const [markerPositionValues, setMarkerPositionValues] = useState([]);
  const {
    radius,
    linearGradient,
    thumbBorderWidth,
    markerLineSize,
    lineColor,
    lineSpace,
    min,
    max,
    markerValue,
    dynamicMarker,
    isHideMarkerLine,
    fixedMarker,
    value,
    markerValueInterval,
  } = props;

  const {
    angle,
    lineCount,
    lines,
    lineHeight,
    isMarkerVariant,
    marks,
    isRadialCircleVariant,
  } = useRadialSlider(props);

  const markerInnerValue = Math.round((max / markerValueInterval) as number);

  useEffect(() => {
    const arr: any = [];
    for (let i = 0; i < marks.length; i = i + markerInnerValue) {
      arr.push(marks[i].value);
    }
    setMarkerPositionValues(arr);
  }, [markerInnerValue, marks, max]);

  return (
    <G>
      {lines.map((_value, index) => {
        const plusActiveIndex = index === 0 ? 0 : 1;
        const activeIndex =
          ((((value - min) * 100) / (max - min)) * lineCount) / 100 +
          plusActiveIndex;

        const getMarketIndex = () => {
          return markerPositionValues.map((val: number) => {
            return Math.floor(
              ((((val - min) * 100) / (max - min)) * lineCount) / 100
            );
          });
        };

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

        const isMarkerLine = getMarketIndex()?.includes(index);

        const isSpeedoMarker = !isMarkerVariant ? 0 : isMarkerLine ? -10 : 0;

        const isSpeedoMeterMarkerLine = isRadialCircleVariant
          ? false
          : isMarkerLine;

        const radialCircleLineRotation = isRadialCircleVariant ? 86 : 90;

        return (
          <G key={index.toString()}>
            {(index % lineSpace === 0 ||
              index === markIndex ||
              isSpeedoMeterMarkerLine) && (
              <G
                transform={`translate(${
                  radius + (lineHeight - thumbBorderWidth)
                }, ${radius + (lineHeight - thumbBorderWidth)})`}>
                <Line
                  x1={
                    index === markIndex && !isHideMarkerLine
                      ? radius + markerLineSize
                      : radius + lineHeight
                  }
                  x2={radius + lineHeight / 2 + isSpeedoMarker}
                  transform={`rotate(${
                    index + radialCircleLineRotation + angle
                  })`}
                  strokeWidth={2}
                  stroke={
                    activeIndex > index ||
                    (index === markIndex && !isHideMarkerLine)
                      ? Platform.OS === 'web'
                        ? linearGradient[0].color
                        : 'url(#gradient)'
                      : lineColor
                  }
                  fill="none"
                  strokeLinecap="round"
                />
              </G>
            )}
          </G>
        );
      })}
    </G>
  );
};

export default LineContent;
