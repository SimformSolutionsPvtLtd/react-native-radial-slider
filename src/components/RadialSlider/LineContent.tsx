import { Platform } from 'react-native';
import React from 'react';
import type { RadialSliderProps } from './types';
import { G, Line } from 'react-native-svg';
import type { defaultProps } from './SliderDefaultProps';
import { useRadialSlider } from './hooks';

const LineContent = (props: RadialSliderProps & typeof defaultProps) => {
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
  } = props;

  const { angle, lineCount, lines, lineHeight } = useRadialSlider(props);

  return (
    <G>
      {lines.map((_value, index) => {
        const activeIndex =
          ((((value - min) * 100) / (max - min)) * lineCount) / 100;
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

        return (
          <G key={index.toString()}>
            {(index % lineSpace === 0 || index === markIndex) && (
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
                  x2={radius + lineHeight / 2}
                  transform={`rotate(${index + 90 + angle})`}
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
