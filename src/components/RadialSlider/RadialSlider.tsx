/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  G,
  Line,
  Text as SVGText,
  Color,
  NumberProp,
  TSpan,
} from 'react-native-svg';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  TouchableOpacity,
  Platform,
} from 'react-native';
import type { RadialSliderProps } from './types';
import { styles } from './styles';
import { Colors } from '../../theme';
class Component<P = {}, S = {}, DP = {}> extends PureComponent<P, S> {
  // Cast the props as something where readonly fields are non optional
  props = this.props as Readonly<{ children?: React.ReactNode }> &
    Readonly<P> &
    Readonly<DP>;
}

interface RadialSliderState {
  value: number;
}

const createRange = (start: any, end: number, step: number | undefined) => {
  const lists = [];
  if (step === undefined) {
    step = 1;
  }
  if (step > 0) {
    for (var i = start; i <= end; i += step) {
      lists.push(i);
    }
  } else {
    for (var i = start; i >= end; i += step) {
      lists.push(i);
    }
  }
  return lists;
};

export default class RadialSlider extends Component<
  RadialSliderProps,
  RadialSliderState,
  typeof RadialSlider.defaultProps
> {
  public static defaultProps = {
    radius: 100,
    min: 0,
    max: 100,
    step: 1,
    statusTitle: '',
    value: 0,
    title: '',
    subTitle: '',
    unit: '',
    thumbRadius: 18,
    thumbColor: Colors.blue,
    thumbBorderWidth: 5,
    thumbBorderColor: Colors.white,
    markerLineSize: 50,
    sliderWidth: 18,
    sliderTrackColor: Colors.grey,
    lineColor: Colors.grey,
    lineSpace: 3,
    linearGradient: [
      { stop: '0%', color: Colors.pink },
      { stop: '100%', color: Colors.red },
    ],
    onChange: (_v: number) => null as any,
    onComplete: (_v: number) => null as any,
    style: {},
    statusContainerStyle: {},
    statusTitleStyle: {},
    statusValueStyle: {},
    centerContentStyle: {},
    contentStyle: {},
    titleStyle: {},
    subTitleStyle: {},
    valueStyle: {},
    unitStyle: {},
    buttonContainerStyle: {},
    letIconStyle: {},
    rightIconStyle: {},
    openingRadian: Math.PI / 3,
    dynamicMarker: false,
    disabled: false,
    isHideSlider: false,
    isHideStatus: false,
    isHideTitle: false,
    isHideSubtitle: false,
    isHideValue: false,
    isHideTailText: false,
    isHideButtons: false,
    isHideLines: false,
    isHideMarkerLine: false,
    isHideCenterContent: false,
  };

  containerRef: React.RefObject<unknown>;
  moveStartValue: any;
  startCartesian: any;
  moveStartRadian: any;
  private panResponder: any;
  vertexX: any;
  vertexY: any;
  children: any;

  constructor(props: RadialSliderProps) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });

    this.state = {
      value: props.value || props.min,
    };

    this.containerRef = React.createRef();
  }

  handlePanResponderGrant = () => {
    const { value } = this.state;
    this.moveStartValue = value;
    this.moveStartRadian = this.getRadianByValue(value);
    this.startCartesian = this.polarToCartesian(this.moveStartRadian);
  };

  handlePanResponderMove = (
    _e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const { min, max, step, openingRadian, onChange } = this.props;
    let { x, y } = this.startCartesian;
    x += gestureState.dx;
    y += gestureState.dy;
    const radian = this.cartesianToPolar(x, y);
    const ratio =
      (this.moveStartRadian - radian) /
      ((Math.PI - (openingRadian as number)) * 2);
    const diff = max - min;

    let value: any;
    if (step) {
      value = this.moveStartValue + Math.round((ratio * diff) / step) * step;
    } else {
      value = this.moveStartValue + ratio * diff;
    }
    value = Math.max(min, Math.min(max, value));
    this.setState(({ value: curValue }) => {
      value = Math.abs(value - curValue) > diff / 4 ? curValue : value;
      return { value: Math.round(value) };
    });
    onChange(this.state.value);
  };

  handlePanResponderEnd = () => {
    const { disabled, onComplete } = this.props;
    if (disabled) {
      return;
    }
    onComplete(this.state.value);
  };

  polarToCartesian(radian: number) {
    const { radius } = this.props;
    const distance = radius + this.getExtraSize() / 2;
    const x = distance + radius * Math.sin(radian);
    const y = distance + radius * Math.cos(radian);
    return { x, y };
  }

  cartesianToPolar(x: number, y: number) {
    const { radius } = this.props;
    const distance = radius + this.getExtraSize() / 2;
    if (x === distance) {
      return y > distance ? 0 : Math.PI / 2;
    }
    const a = Math.atan((y - distance) / (x - distance));
    return (x < distance ? (Math.PI * 3) / 2 : Math.PI / 2) - a;
  }

  getCurrentRadian() {
    return this.getRadianByValue(this.state.value);
  }

  getRadianByValue(value: number) {
    const { openingRadian, min, max } = this.props;
    return (
      ((Math.PI - openingRadian) * 2 * (max - value)) / (max - min) +
      openingRadian
    );
  }

  getExtraSize() {
    const { sliderWidth, thumbRadius, thumbBorderWidth } = this.props;
    return Math.max(sliderWidth, (thumbRadius + thumbBorderWidth) * 2);
  }

  onLayout = () => {
    const ref = this.containerRef.current as any;
    if (ref) {
      ref.measure(
        (
          _x: any,
          _y: any,
          _width: any,
          _height: any,
          pageX: any,
          pageY: any
        ) => {
          this.vertexX = pageX;
          this.vertexY = pageY;
        }
      );
    }
  };

  onPressButtons = (type: string) => {
    const { step, min, max } = this.props;
    if (type === 'up' && max > this.state.value) {
      this.setState((prevState) => ({
        value: prevState.value + step,
      }));
    } else if (type === 'down' && min < this.state.value) {
      this.setState((prevState) => ({
        value: prevState.value - step,
      }));
    }
  };

  angle = (this.props.openingRadian * 180.0) / Math.PI;
  lineCount = (360 - this.angle * 2) as number;
  lines = createRange(this.props.min, this.lineCount + this.props.min, 1);

  render() {
    const {
      radius,
      sliderWidth,
      sliderTrackColor,
      openingRadian,
      linearGradient,
      thumbRadius,
      thumbBorderColor,
      thumbColor,
      thumbBorderWidth,
      style,
      statusTitle,
      statusValue,
      title,
      subTitle,
      unit,
      markerLineSize,
      disabled,
      lineColor,
      lineSpace,
      statusContainerStyle,
      statusTitleStyle,
      statusValueStyle,
      centerContentStyle,
      contentStyle,
      titleStyle,
      subTitleStyle,
      valueStyle,
      unitStyle,
      buttonContainerStyle,
      letIconStyle,
      rightIconStyle,
      min,
      max,
      markerValue,
      dynamicMarker,
      isHideSlider,
      isHideStatus,
      isHideCenterContent,
      isHideTitle,
      isHideSubtitle,
      isHideValue,
      isHideTailText,
      isHideButtons,
      isHideLines,
      isHideMarkerLine,
    } = this.props;
    const svgSize = radius * 2 + this.getExtraSize();
    const startRadian = 2 * Math.PI - openingRadian;
    const startPoint = this.polarToCartesian(startRadian);
    const endPoint = this.polarToCartesian(openingRadian);
    const currentRadian = this.getCurrentRadian();
    const curPoint = this.polarToCartesian(currentRadian);
    const lineHeight = this.getExtraSize() / 2 + thumbBorderWidth;

    const leftButtonStyle = StyleSheet.flatten([
      letIconStyle,
      (disabled || min === this.state.value) && {
        opacity: 0.5,
      },
    ]);

    const rightButtonStyle = StyleSheet.flatten([
      rightIconStyle,
      (disabled || max === this.state.value) && {
        opacity: 0.5,
      },
    ]);

    return (
      <View
        onLayout={this.onLayout}
        ref={this.containerRef as any}
        style={[styles.container, style, { width: svgSize, height: svgSize }]}
        testID='slider-view'
      >
        <Svg
          width={
            svgSize + markerLineSize / 2 - (Platform.OS === 'web' ? 20 : 0)
          }
          height={svgSize + markerLineSize / 2}
          viewBox={`-${markerLineSize / 2} -${markerLineSize / 2} ${
            svgSize + markerLineSize
          } ${svgSize + markerLineSize}`}
          preserveAspectRatio='none'
        >
          <Defs>
            <LinearGradient x1='0%' y1='100%' x2='100%' y2='0%' id='gradient'>
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
          {!isHideTailText && (
            <>
              <G transform={`translate(${-20}, ${40})`}>
                <SVGText
                  fill={Colors.darkCharcoal}
                  // fontFamily="Poppins-Regular"
                  fontSize={12}
                >
                  <TSpan x={startPoint.x} y={startPoint.y}>
                    {`${this.props.min}${unit}`}
                  </TSpan>
                </SVGText>
              </G>
              <G transform={`translate(${-10}, ${40})`}>
                <SVGText
                  fill={Colors.darkCharcoal}
                  // fontFamily="Poppins-Regular"
                  fontSize={12}
                >
                  <TSpan x={endPoint.x} y={endPoint.y}>
                    {`${max}${unit}`}
                  </TSpan>
                </SVGText>
              </G>
            </>
          )}
          {!isHideLines && (
            <G>
              {this.lines.map((_value, index) => {
                const activeIndex =
                  ((((this.state.value - min) * 100) / (max - min)) *
                    this.lineCount) /
                  100;

                const markIndex = Math.floor(
                  (((((!dynamicMarker
                    ? (markerValue as number)
                    : this.state.value) -
                    min) *
                    100) /
                    (max - min)) *
                    this.lineCount) /
                    100
                );

                return (
                  <G key={index.toString()}>
                    {(index % lineSpace === 0 || index === markIndex) && (
                      <G
                        transform={`translate(${
                          this.props.radius + (lineHeight - thumbBorderWidth)
                        }, ${
                          this.props.radius + (lineHeight - thumbBorderWidth)
                        })`}
                      >
                        <Line
                          x1={
                            index === markIndex && !isHideMarkerLine
                              ? this.props.radius + markerLineSize
                              : this.props.radius + lineHeight
                          }
                          x2={this.props.radius + lineHeight / 2}
                          transform={`rotate(${index + 90 + this.angle})`}
                          strokeWidth={2}
                          stroke={
                            activeIndex > index ||
                            (index === markIndex && !isHideMarkerLine)
                              ? Platform.OS === 'web'
                                ? linearGradient[0].color
                                : 'url(#gradient)'
                              : lineColor
                          }
                          fill='none'
                          strokeLinecap='round'
                        />
                      </G>
                    )}
                  </G>
                );
              })}
            </G>
          )}
          {!isHideSlider && (
            <>
              <Path
                strokeWidth={sliderWidth}
                stroke={sliderTrackColor}
                fill='none'
                strokeLinecap='round'
                d={`M${startPoint.x},${startPoint.y} A ${radius},${radius},0,${
                  startRadian - openingRadian >= Math.PI ? '1' : '0'
                },1,${endPoint.x},${endPoint.y}`}
              />
              <Path
                strokeWidth={sliderWidth}
                stroke='url(#gradient)'
                fill='none'
                strokeLinecap='round'
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
                {...this.panResponder.panHandlers}
              />
            </>
          )}
        </Svg>
        <View style={[styles.content, contentStyle]} pointerEvents='box-none'>
          {/* Status Content */}
          {!isHideStatus && (
            <View style={[styles.statusView, statusContainerStyle]}>
              <Text style={[statusTitleStyle, styles.helperText]}>
                {statusTitle ?? ''}
              </Text>
              <View
                style={styles.hideStatus}

                // space={0}
              >
                <Text
                  style={[
                    styles.statusValueText,
                    statusValueStyle,
                    styles.large_header,
                  ]}
                >
                  {statusValue?.toString() ?? ''}
                </Text>
                {statusValue?.toString() && (
                  <Text style={[styles.statusValueUnit, styles.helperText]}>
                    {unit}
                  </Text>
                )}
              </View>
            </View>
          )}
          {/* Center Content */}
          {!isHideCenterContent && (
            <View style={[styles.hideCenterContent, centerContentStyle]}>
              {!isHideTitle && (
                <Text style={[titleStyle, styles.helperText]}>{title}</Text>
              )}
              {!isHideValue && (
                <View
                  style={[
                    styles.hideValue,
                    {
                      marginLeft: unit?.length ? unit?.length * 5 : 10,
                    },
                  ]}

                  // space={0}
                >
                  <Text
                    style={[styles.valueText, valueStyle, styles.large_header]}
                  >
                    {this.state.value}
                  </Text>
                  <Text
                    style={[styles.valueUnit, unitStyle, styles.helperText]}
                  >
                    {unit}
                  </Text>
                </View>
              )}
              {!isHideSubtitle && (
                <Text style={[subTitleStyle, styles.helperText]}>
                  {subTitle}
                </Text>
              )}
            </View>
          )}
          {/* Button Content */}
          {!isHideButtons && (
            <View style={[styles.buttonsWrapper, buttonContainerStyle]}>
              <View
                style={styles.center}

                // space={(radius * 2 * 10) / 100}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={disabled || min === this.state.value}
                  onPress={() => this.onPressButtons('down')}
                  style={leftButtonStyle}
                  testID='left-btn'
                >
                  <Svg height='30' width='30'>
                    <G>
                      <Circle cx='20' cy='20' r='20' />
                      <Path
                        d='M12.5168 23.7373L20.067 16.1616L27.6172 23.7373'
                        stroke={Colors.blue}
                        strokeWidth='2.4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </G>
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={disabled || max === this.state.value}
                  onPress={() => this.onPressButtons('up')}
                  style={rightButtonStyle}
                  testID='right-btn'
                >
                  <Svg height='30' width='30'>
                    <G>
                      <Circle cx='20' cy='20' r='20' />
                      <Path
                        d='M12.5168 17.2727L20.067 24.8485L27.6172 17.2727'
                        stroke={Colors.blue}
                        strokeWidth='2.4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </G>
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
