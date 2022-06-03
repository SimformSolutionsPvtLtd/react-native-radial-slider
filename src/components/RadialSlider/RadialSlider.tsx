import React from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Color,
  NumberProp,
} from 'react-native-svg';
import { View, Platform } from 'react-native';
import type { RadialSliderProps } from './types';
import { styles } from './styles';
import { Colors } from '../../theme';
import { useSilderAnimation, useRadialSlider } from './hooks';
import { defaultProps } from './SliderDefaultProps';
import ButtonContent from './ButtonContent';
import StautsContent from './StautsContent';
import CenterContent from './CenterContent';
import TailText from './TailText';
import LineContent from './LineContent';

const RadialSlider = (props: RadialSliderProps & typeof defaultProps) => {
  const {
    step,
    radius,
    sliderWidth,
    sliderTrackColor,
    linearGradient,
    thumbRadius,
    thumbBorderColor,
    thumbColor,
    thumbBorderWidth,
    style,
    markerLineSize,
    disabled,
    contentStyle,
    buttonContainerStyle,
    min,
    max,
    isHideSlider,
    isHideStatus,
    isHideCenterContent,
    isHideTailText,
    isHideButtons,
    isHideLines,
  } = props;

  const { panResponder, value, setValue, curPoint, currentRadian } =
    useSilderAnimation(props);

  const {
    svgSize,
    containerRef,
    startPoint,
    endPoint,
    startRadian,
    leftButtonStyle,
    rightButtonStyle,
    radianValue,
    isRadialCircleVariant,
  } = useRadialSlider(props);

  const onLayout = () => {
    const ref = containerRef.current as any;
    if (ref) {
      ref.measure((_x: any, _y: any, _width: any, _height: any) => {});
    }
  };

  const onPressButtons = (type: string) => {
    if (type === 'up' && max > value) {
      setValue((prevState: number) => prevState + step);
    } else if (type === 'down' && min < value) {
      setValue((prevState: number) => prevState - step);
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
        {!isRadialCircleVariant && !isHideTailText && <TailText {...props} />}
        {!isHideLines && <LineContent {...props} value={value} />}
        {!isHideSlider && (
          <>
            <Path
              strokeWidth={sliderWidth}
              stroke={sliderTrackColor}
              fill="none"
              strokeLinecap="round"
              d={`M${startPoint.x},${startPoint.y} A ${radius},${radius},0,${
                startRadian - radianValue >= Math.PI ? '1' : '0'
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
            <Circle
              cx={curPoint.x}
              cy={curPoint.y}
              r={thumbRadius}
              fill={thumbColor || thumbBorderColor}
              stroke={thumbBorderColor}
              strokeWidth={thumbBorderWidth}
              {...panResponder.panHandlers}
            />
          </>
        )}
      </Svg>
      <View style={[styles.content, contentStyle]} pointerEvents="box-none">
        {/* Status Content */}
        {!isHideStatus && <StautsContent {...props} />}
        {/* Center Content */}
        {!isHideCenterContent && <CenterContent {...props} value={value} />}
        {/* Button Content */}
        {!isRadialCircleVariant && !isHideButtons && (
          <View style={[styles.buttonsWrapper, buttonContainerStyle]}>
            <View style={styles.center}>
              <ButtonContent
                onPress={() => onPressButtons('down')}
                buttonType="left-btn"
                style={leftButtonStyle}
                disabled={disabled || min === value}
                stroke={Colors.blue}
              />
              <ButtonContent
                disabled={disabled || max === value}
                onPress={() => onPressButtons('up')}
                style={rightButtonStyle}
                buttonType="right-btn"
                stroke={Colors.blue}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

RadialSlider.defaultProps = defaultProps;
export default RadialSlider;
