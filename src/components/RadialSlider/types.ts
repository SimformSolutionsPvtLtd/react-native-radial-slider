import type { ViewStyle, TextStyle, StyleProp } from 'react-native';

export interface RadialSliderProps {
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
   * Status title.
   */
  statusTitle?: string;
  /**
   * Status value.
   */
  statusValue?: number | string;
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
  linearGradient?: { stop: string; color: string }[];
  /**
   * Callback function which fired on change in track.
   */
  onChange?: Function;
  /**
   * Callback function which defines what to do after completion.
   */
  onComplete?: Function;
  /**
   * Status container style.
   */
  statusContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Status title text style.
   */
  statusTitleStyle?: StyleProp<TextStyle>;
  /**
   * Status value text style.
   */
  statusValueStyle?: StyleProp<TextStyle>;
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
  letIconStyle?: StyleProp<ViewStyle>;
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
   * If false, marker will be static.
   */
  dynamicMarker?: boolean;
  /**
   * If true, slider will be hidden.
   */
  isHideSlider?: boolean;
  /**
   * If true, status will be hidden.
   */
  isHideStatus?: boolean;
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
   * Speedometer content styling.
   */
  hideStyle?: StyleProp<ViewStyle>;
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
   * BackgroundColor for niddle.
   */
  niddleBackgroundColor?: string;
  /**
   * Color for niddle.
   */
  niddleColor?: string;
  /**
   * Width of niddle.
   */
  niddleBorderWidth?: number;
  /**
   * Width of niddle.
   */
  niddleHeight?: number;
}

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
}
