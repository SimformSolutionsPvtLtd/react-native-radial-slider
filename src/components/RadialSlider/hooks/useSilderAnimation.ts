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

interface StartCartesianProps {
  x: number;
  y: number;
}

interface Props {
  step: number;
  radius: number;
  sliderWidth: number;
  openingRadian: number;
  thumbRadius: number;
  thumbBorderWidth: number;
  disabled: boolean;
  min: number;
  onChange: Function;
  max: number;
  onComplete: Function;
  value: number;
}

const useSilderAnimation = (props: Props) => {
  const {
    step,
    radius,
    sliderWidth,
    openingRadian,
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

  const prevValue = useRef(props.value > min ? props.value : min);

  const [value, setValue] = useState(
    props.value >= min ? props.value || min : min
  );

  const handlePanResponderGrant = () => {
    moveStartValue = prevValue.current;
    moveStartRadian = getRadianByValue(
      prevValue.current,
      openingRadian,
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
      (moveStartRadian - radian) / ((Math.PI - (openingRadian as number)) * 2);

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

  const currentRadian = getCurrentRadian(value, openingRadian, max, min);

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
