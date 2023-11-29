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

const polarToCartesian = (
  radian: number,
  radius: number,
  sliderWidth: number,
  thumbRadius: number,
  thumbBorderWidth: number,
  isTopVariant: boolean
) => {
  const calculatedRadian = isTopVariant ? radian + Math.PI : radian;

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
  isTopVariant: boolean
) => {
  const distance =
    radius + getExtraSize(sliderWidth, thumbRadius, thumbBorderWidth) / 2;

  if (x === distance) {
    return y > distance ? 0 : Math.PI / 2;
  }

  const a = Math.atan((y - distance) / (x - distance));

  const isXGreaterThanDistance = isTopVariant ? x > distance : x < distance;

  const polarAngle =
    (isXGreaterThanDistance ? (Math.PI * 3) / 2 : Math.PI / 2) - a;

  return polarAngle;
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
