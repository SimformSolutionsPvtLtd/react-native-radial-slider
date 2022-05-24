import React, { useEffect } from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Color,
  NumberProp,
} from 'react-native-svg';
import { View, Platform } from 'react-native';
import type { RadialSliderProps } from './types';
import { styles } from './styles';
import { useSilderAnimation, useRadialSlider } from './hooks';
import { defaultProps } from './SliderDefaultProps';
import StautsContent from './StautsContent';
import CenterContent from './CenterContent';
import TailText from './TailText';
import LineContent from './LineContent';
import NiddleContent from './NiddleContent';

const SpeedoMeter = (props: RadialSliderProps & typeof defaultProps) => {
  const {
    radius,
    sliderWidth,
    sliderTrackColor,
    openingRadian,
    linearGradient,
    style,
    markerLineSize,
    contentStyle,
    isHideSlider,
    isHideStatus,
    isHideCenterContent,
    isHideTailText,
    isHideLines,
  } = props;

  const { value, setValue, curPoint, currentRadian } =
    useSilderAnimation(props);

  useEffect(() => {
    setValue(props.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const { svgSize, containerRef, startPoint, endPoint, startRadian } =
    useRadialSlider(props);

  const onLayout = () => {
    const ref = containerRef.current as any;
    if (ref) {
      ref.measure((_x: any, _y: any, _width: any, _height: any) => {});
    }
  };

  return (
    <View
      onLayout={onLayout}
      ref={containerRef as any}
      style={[styles.container, style, { width: svgSize, height: svgSize }]}
      testID="slider-view">
      <Svg
        width={svgSize + markerLineSize / 2 - (Platform.OS === 'web' ? 20 : 0)}
        height={svgSize + markerLineSize / 2}
        viewBox={`-${markerLineSize / 2} -${markerLineSize / 2} ${
          svgSize + markerLineSize
        } ${svgSize + markerLineSize}`}
        preserveAspectRatio="none">
        <Defs>
          <LinearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="gradient">
            {linearGradient.map(
              (
                item: {
                  stop: NumberProp | undefined;
                  color: Color | undefined;
                },
                index: React.Key | null | undefined
              ) => (
                <Stop key={index} offset={item.stop} stopColor={item.color} />
              )
            )}
          </LinearGradient>
        </Defs>
        {!isHideTailText && <TailText {...props} />}
        {!isHideLines && <LineContent {...props} value={value} />}
        {!isHideSlider && (
          <>
            <Path
              strokeWidth={sliderWidth}
              stroke={sliderTrackColor}
              fill="none"
              strokeLinecap="round"
              d={`M${startPoint.x},${startPoint.y} A ${radius},${radius},0,${
                startRadian - openingRadian >= Math.PI ? '1' : '0'
              },1,${endPoint.x},${endPoint.y}`}
            />
            <Path
              strokeWidth={sliderWidth}
              stroke="url(#gradient)"
              fill="none"
              strokeLinecap="round"
              d={`M${startPoint.x},${startPoint.y} A ${radius},${radius},0,${
                startRadian - currentRadian >= Math.PI ? '1' : '0'
              },1,${curPoint.x},${curPoint.y}`}
            />
          </>
        )}
        <NiddleContent {...props} value={value} />
      </Svg>
      <View style={[styles.content, contentStyle]} pointerEvents="box-none">
        {/* Status Content */}
        {!isHideStatus && <StautsContent {...props} />}
        {/* Center Content */}
        {!isHideCenterContent && (
          <CenterContent
            {...props}
            value={value}
            hideStyle={styles.centerText}
            isHideSubtitle
            centerContentStyle={styles.centerTextView}
          />
        )}
      </View>
    </View>
  );
};

SpeedoMeter.defaultProps = defaultProps;
export default SpeedoMeter;
