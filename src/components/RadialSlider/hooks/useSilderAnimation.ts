import { useState, useRef } from 'react';
import {
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {
  cartesianToPolar,
  getCurrentRadian,
  getRadianByValue,
  polarToCartesian,
} from '../../../utils/commonHelpers';
import type { RadialSliderProps } from '../types';
import type { defaultProps } from '../SliderDefaultProps';
import useRadialSlider from './useRadialSlider';

interface StartCartesianProps {
  x: number;
  y: number;
}

const useSilderAnimation = (props: RadialSliderProps & typeof defaultProps) => {
  const {
    step,
    radius,
    sliderWidth,
    thumbRadius,
    thumbBorderWidth,
    disabled,
    min,
    onChange,
    max,
    onComplete,
  } = props;

  let moveStartValue: number;
  let startCartesian: StartCartesianProps;
  let moveStartRadian: number;
  const { radianValue } = useRadialSlider(props);
  const prevValue = useRef(props.value > min ? props.value : min);

  const [value, setValue] = useState(
    props.value >= min ? props.value || min : min
  );

  const handlePanResponderGrant = () => {
    moveStartValue = prevValue.current;
    moveStartRadian = getRadianByValue(
      prevValue.current,
      radianValue,
      max,
      min
    );
    startCartesian = polarToCartesian(
      moveStartRadian,
      radius,
      sliderWidth,
      thumbRadius,
      thumbBorderWidth
    );
    return true;
  };

  const handlePanResponderMove = (
    _e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (disabled) {
      return;
    }
    let { x, y } = startCartesian;
    x += gestureState.dx;
    y += gestureState.dy;

    const radian = cartesianToPolar(
      x,
      y,
      radius,
      sliderWidth,
      thumbRadius,
      thumbBorderWidth
    );

    const ratio =
      (moveStartRadian - radian) / ((Math.PI - (radianValue as number)) * 2);

    const diff = max - min;

    let nValue: any;
    if (step) {
      nValue = moveStartValue + Math.round((ratio * diff) / step) * step;
    } else {
      nValue = moveStartValue + ratio * diff;
    }
    nValue = Math.max(min, Math.min(max, nValue));

    setValue((prevState: number) => {
      prevValue.current = Math.round(
        Math.abs(nValue - prevState) > diff / 4 ? prevState : nValue
      );
      return Math.round(
        Math.abs(nValue - prevState) > diff / 4 ? prevState : nValue
      );
    });

    onChange(prevValue.current);
  };

  const handlePanResponderEnd = () => {
    if (disabled) {
      return;
    }
    onComplete(value);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: handlePanResponderGrant,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderEnd,
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: handlePanResponderEnd,
    })
  ).current;

  const currentRadian = getCurrentRadian(value, radianValue, max, min);

  const curPoint = polarToCartesian(
    currentRadian,
    radius,
    sliderWidth,
    thumbRadius,
    thumbBorderWidth
  );

  return {
    panResponder,
    prevValue,
    value,
    setValue,
    curPoint,
    currentRadian,
  };
};

export default useSilderAnimation;
