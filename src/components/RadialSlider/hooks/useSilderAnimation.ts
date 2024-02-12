import { useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';
import {
  cartesianToPolar,
  getCurrentRadian,
  getRadianByValue,
  polarToCartesian,
} from '../../../utils/commonHelpers';
import type { RadialSliderAnimationHookProps } from '../types';
import useRadialSlider from './useRadialSlider';

interface StartCartesianProps {
  x: number;
  y: number;
}

const useSilderAnimation = (props: RadialSliderAnimationHookProps) => {
  const {
    step = 1,
    radius = 100,
    sliderWidth = 18,
    thumbRadius = 18,
    thumbBorderWidth = 5,
    disabled,
    min = 0,
    onChange = () => {},
    max = 100,
    onComplete = () => {},
    thumbPoint = 270,
    variant = 'default',
  } = props;

  let moveStartValue: number;
  let startCartesian: StartCartesianProps;
  let moveStartRadian: number;
  const { radianValue } = useRadialSlider(props);
  const prevValue = useRef(props.value > min ? props.value : min);

  const [value, setValue] = useState(
    props?.value < min ? min : props?.value > max ? max : props?.value
  );

  useEffect(() => {
    if (max < props?.value) {
      setValue(max);
    } else if (min > props?.value) {
      setValue(min);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max, min]);

  useEffect(() => {
    if (min <= props?.value && max >= props?.value) {
      setValue(props?.value);
      prevValue.current = props?.value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.value]);

  useEffect(() => {
    onChange(value);
    prevValue.current = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
      thumbBorderWidth as number,
      thumbPoint,
      variant
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
      thumbBorderWidth as number,
      thumbPoint,
      variant
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
    onComplete(prevValue.current);
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
    thumbBorderWidth as number,
    thumbPoint,
    variant
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
