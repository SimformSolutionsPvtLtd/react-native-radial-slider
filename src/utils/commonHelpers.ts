import Constants from '../../src/constants';

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

const calculateRadianForCircleVariant = (thumbPoint: number) => {
  const angleOffset = 90 + thumbPoint;
  const offsetRadian = (angleOffset * Math.PI) / 180;
  return offsetRadian;
};

const polarToCartesian = (
  radian: number,
  radius: number,
  sliderWidth: number,
  thumbRadius: number,
  thumbBorderWidth: number,
  thumbPoint: number,
  variant: string
) => {
  const calculatedRadian =
    variant === Constants.radialCircleSlider
      ? radian + calculateRadianForCircleVariant(thumbPoint)
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
  thumbPoint: number,
  variant: string
) => {
  const distance =
    radius + getExtraSize(sliderWidth, thumbRadius, thumbBorderWidth) / 2;

  if (variant === Constants.radialCircleSlider) {
    const angleFromCenter = Math.atan2(y - distance, x - distance);

    let angle = (thumbPoint * Math.PI) / 180;
    angle = (angle + 2 * Math.PI) % (2 * Math.PI);
    angle = (2 * Math.PI - angle) % (2 * Math.PI);

    let clockwiseDifference = angle - angleFromCenter;

    if (clockwiseDifference < 0) {
      clockwiseDifference += 2 * Math.PI;
    }

    clockwiseDifference %= 2 * Math.PI;

    return clockwiseDifference;
  } else {
    if (x === distance) {
      return y > distance ? 0 : Math.PI / 2;
    }
    const a = Math.atan((y - distance) / (x - distance));
    return (x < distance ? (Math.PI * 3) / 2 : Math.PI / 2) - a;
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
