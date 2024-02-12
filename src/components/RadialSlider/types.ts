import type { ViewStyle, TextStyle, StyleProp } from 'react-native';
import type { Linecap } from 'react-native-svg';

type RadialSliderExcludedProps = {
  unitValueContentStyle?: StyleProp<ViewStyle>;
  markerCircleSize?: never;
  markerCircleColor?: never;
  markerPositionY?: never;
  markerPositionX?: never;
  needleBackgroundColor?: never;
  needleColor?: never;
  needleBorderWidth?: never;
  needleHeight?: never;
  markerValueInterval?: never;
  markerValueColor?: never;
  strokeLinecap?: never;
};

export type CenterContentProps = {
  title?: string;
  subTitle?: string;
  unit?: string;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  unitStyle?: StyleProp<TextStyle>;
  isHideTitle?: boolean;
  isHideSubtitle?: boolean;
  isHideValue?: boolean;
  value?: number;
  centerContentStyle?: StyleProp<ViewStyle>;
  unitValueContentStyle?: StyleProp<ViewStyle>;
};

export type LineContentProps = {
  radius?: number;
  linearGradient?: { offset: string; color: string }[];
  thumbBorderWidth?: number;
  markerLineSize?: number;
  lineColor?: string;
  lineSpace?: number;
  min?: number;
  max?: number;
  markerValue?: number;
  isHideMarkerLine?: boolean;
  fixedMarker?: boolean;
  value?: number;
  markerValueInterval?: number;
  thumbPoint?: number;
};

export type TextTailProps = {
  min?: number;
  max?: number;
  unit?: string;
};

export type RadialSliderHookProps = {
  radius?: number;
  sliderWidth?: number;
  openingRadian?: number;
  thumbRadius?: number;
  thumbBorderWidth?: number;
  min?: number;
  max?: number;
  variant?: 'radial-circle-slider' | string;
  step?: number;
  thumbPoint?: number;
};

export type MarkerValueContentProps = {
  radius?: number;
  thumbBorderWidth?: number;
  min?: number;
  max?: number;
  markerValue?: number;
  fixedMarker?: boolean;
  markerValueInterval?: number;
  value?: number;
  markerValueColor?: string;
};

export type RadialSliderAnimationHookProps = {
  step?: number;
  radius?: number;
  sliderWidth?: number;
  thumbRadius?: number;
  thumbBorderWidth?: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  onChange?: (v: number) => void;
  onComplete?: (v: number) => void;
  value: number;
  variant?: string;
  thumbPoint?: number;
};

export type NeedleContentProps = {
  radius?: number;
  min?: number;
  max?: number;
  markerCircleSize?: number;
  markerCircleColor?: string;
  markerPositionY?: number;
  markerPositionX?: number;
  needleBackgroundColor?: string;
  needleColor?: string;
  needleBorderWidth?: number;
  needleHeight?: number;
  value?: number;
};

export type RootSliderProps =
  | ({
      variant?: 'radial-circle-slider';
    } & RadialSliderExcludedProps &
      RadialSliderProps)
  | ({
      variant: 'speedometer-marker' | 'speedometer';
    } & SpeedoMeterProps);

export type RadialSliderProps = {
  /**
   * Radious of radial slider.
   */
  radius?: number;
  /**
   * Min value of radial slider.
   */
  min?: number;
  /**
   * Max value to radial slider.
   */
  max?: number;
  /**
   * Radial slider step value.
   */
  step?: number;
  /**
   * Show marker on specific number.
   */
  markerValue?: number;
  /**
   * Show selection upto this value.
   */
  value?: number;
  /**
   * Radial slider title.
   */
  title?: string;
  /**
   * Radial slider subtitle.
   */
  subTitle?: string;
  /**
   * Radial slider unit.
   */
  unit?: string;
  /**
   * Radious of thumb/knob.
   */
  thumbRadius?: number;
  /**
   * Color of thumb/knob.
   */
  thumbColor?: string;
  /**
   * Border width of thumb/knob.
   */
  thumbBorderWidth?: number;
  /**
   * Border color of thumb/knob.
   */
  thumbBorderColor?: string;
  /**
   * Starting position of thumb/knob
   */
  thumbPoint?: number;
  /**
   * Size of marker line.
   */
  markerLineSize?: number;
  /**
   * Width of slider.
   */
  sliderWidth?: number;
  /**
   * Color of unselected slider track.
   */
  sliderTrackColor?: string;
  /**
   * Color of unselected lines.
   */
  lineColor?: string;
  /**
   * Space between each line.
   */
  lineSpace?: number;
  /**
   * Gradient color of selected track.
   */
  linearGradient?: { offset: string; color: string }[];
  /**
   * Callback function which fired on change in track.
   */
  onChange?: (v: number) => void;
  /**
   * Callback function which defines what to do after completion.
   */
  onComplete?: (v: number) => void;
  /**
   * Center content styling.
   */
  centerContentStyle?: StyleProp<ViewStyle>;
  /**
   * Status title container styling.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Status subtitle text styling.
   */
  subTitleStyle?: StyleProp<TextStyle>;
  /**
   * Center value style.
   */
  valueStyle?: StyleProp<TextStyle>;
  /**
   * Button container styling.
   */
  buttonContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Left Icon styling.
   */
  leftIconStyle?: StyleProp<ViewStyle>;
  /**
   * Right Icon styling.
   */
  rightIconStyle?: StyleProp<ViewStyle>;
  /**
   * Whole content styling.
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Unit text styling.
   */
  unitStyle?: StyleProp<TextStyle>;
  /**
   * Inner container styling.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Radian of the slider.
   */
  openingRadian?: number;
  /**
   * If true, buttons will be in disabled state.
   */
  disabled?: boolean;
  /**
   * If true, slider will be hidden.
   */
  isHideSlider?: boolean;
  /**
   * If true, center content will be hidden.
   */
  isHideCenterContent?: boolean;
  /**
   * If true, title will be hidden.
   */
  isHideTitle?: boolean;
  /**
   * If true, subtitle will be hidden.
   */
  isHideSubtitle?: boolean;
  /**
   * If true, value will be hidden.
   */
  isHideValue?: boolean;
  /**
   * If true, tail text will be hidden.
   */
  isHideTailText?: boolean;
  /**
   * If true, buttons will be hidden.
   */
  isHideButtons?: boolean;
  /**
   * If true, lines will be hidden.
   */
  isHideLines?: boolean;
  /**
   * If true, marked lines will be hidden.
   */
  isHideMarkerLine?: boolean;
  /**
   * If true, marked value will be hidden.
   */
  fixedMarker?: boolean;
  /**
   * Color for icon
   */
  stroke?: string;
};

export interface ButtonProps {
  /**
   * If true, buttons will be in disabled state.
   */
  disabled?: boolean;
  /**
   * Based on click value will be increased or decreased
   */
  onPress?: () => void;
  /**
   * Button container styling.
   */
  style: any;
  /**
   * buttonType for the icon
   */
  buttonType?: string;
  /**
   * Color for icon
   */
  stroke?: string;
  /**
   * Based on click, the value will continue to increase or decrease
   */
  onLongPress?: () => void;
  /**
   * Based on click, the value will stop to continue to increase or decrease
   */
  onPressOut?: () => void;
}

export type SpeedoMeterProps = RadialSliderProps & {
  /**
   * SpeedoMeter content styling.
   */
  unitValueContentStyle?: StyleProp<ViewStyle>;
  /**
   * Size for marker circle.
   */
  markerCircleSize?: number;
  /**
   * Color for marker circle.
   */
  markerCircleColor?: string;
  /**
   * Marker position for up and down.
   */
  markerPositionY?: number;
  /**
   * Marker position for right and left.
   */
  markerPositionX?: number;
  /**
   * BackgroundColor for needle.
   */
  needleBackgroundColor?: string;
  /**
   * Color for needle.
   */
  needleColor?: string;
  /**
   * Width of needle.
   */
  needleBorderWidth?: number;
  /**
   * Width of needle.
   */
  needleHeight?: number;
  /**
   * Show number of value in sequence.
   */
  markerValueInterval?: number;
  /**
   * Color for marker value.
   */
  markerValueColor?: string;
  /**
   * StrokeLineCap for path.
   */
  strokeLinecap?: Linecap | string;
  centerContentStyle?: never;
  buttonContainerStyle?: never;
  leftIconStyle?: never;
  rightIconStyle?: never;
  subTitleStyle?: never;
  disabled?: never;
  isHideButtons?: never;
  subTitle?: never;
  thumbColor?: never;
  thumbBorderWidth?: never;
  thumbBorderColor?: never;
  thumbRadius?: never;
  title?: never;
  titleStyle?: never;
  step?: never;
};
