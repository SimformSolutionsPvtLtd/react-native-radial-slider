import Constants from '../constants';

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

const getExtraSize = (
  sliderWidth: number,
  thumbRadius: number,
  thumbBorderWidth: number
) => {
  return Math.max(sliderWidth, (thumbRadius + thumbBorderWidth) * 2);
};

const getRadianByValue = (
  nvalue: number,
  openingRadian: number,
  max: number,
  min: number
) => {
  return (
    ((Math.PI - openingRadian) * 2 * (max - nvalue)) / (max - min) +
    openingRadian
  );
};

const calculateRadianForCircleVariant = (sliderStartPointValue: number) => {
  const angleOffset = 90 + sliderStartPointValue;
  const offsetRadian = (angleOffset * Math.PI) / 180;
  return offsetRadian;
};

const polarToCartesian = (
  radian: number,
  radius: number,
  sliderWidth: number,
  thumbRadius: number,
  thumbBorderWidth: number,
  sliderPoint: number,
  variant: string
) => {
  const calculatedRadian =
    variant === Constants.radialCircleSlider
      ? radian + calculateRadianForCircleVariant(sliderPoint)
      : radian;

  const distance =
    radius + getExtraSize(sliderWidth, thumbBorderWidth, thumbRadius) / 2;
  const x = distance + radius * Math.sin(calculatedRadian);
  const y = distance + radius * Math.cos(calculatedRadian);

  return { x, y };
};

const cartesianToPolar = (
  x: number,
  y: number,
  radius: number,
  sliderWidth: number,
  thumbRadius: number,
  thumbBorderWidth: number,
  sliderPoint: number,
  variant: string
) => {
  const TWO_PI = 2 * Math.PI;

  // Calculate the distance from the center to the edge considering extra size
  const distance =
    radius + getExtraSize(sliderWidth, thumbRadius, thumbBorderWidth) / 2;

  if (variant === Constants.radialCircleSlider) {
    // Calculate the angle from the center to the given point
    const angleFromCenter = Math.atan2(y - distance, x - distance);

    // Convert slider point from degrees to radians
    let angle = (sliderPoint * Math.PI) / 180;
    // Normalize the angle to be between 0 and 2*PI
    angle = (TWO_PI - angle) % TWO_PI;

    // Calculate the clockwise difference between the slider point and the angle from the center
    let clockwiseDifference = angle - angleFromCenter;

    if (clockwiseDifference < 0) {
      clockwiseDifference += TWO_PI;
    }

    // Normalize the result to be between 0 and 2*PI
    clockwiseDifference %= TWO_PI;

    return clockwiseDifference;
  } else {
    if (x === distance) {
      return y > distance ? 0 : Math.PI / 2;
    }
    // Calculate the angle from the center to the given point
    const angleFromCenterToGivenPoint = Math.atan(
      (y - distance) / (x - distance)
    );
    // Determine the quadrant and adjust the angle accordingly
    return (
      (x < distance ? (Math.PI * 3) / 2 : Math.PI / 2) -
      angleFromCenterToGivenPoint
    );
  }
};

const getCurrentRadian = (
  value: number,
  openingRadian: number,
  max: number,
  min: number
) => {
  return getRadianByValue(value, openingRadian!, max, min);
};

export {
  polarToCartesian,
  createRange,
  getRadianByValue,
  getExtraSize,
  cartesianToPolar,
  getCurrentRadian,
};
