//@ts-nocheck
import React from 'react';
import { render } from '@testing-library/react-native';
import RadialSlider from '../RadialSlider';

jest.useFakeTimers();

describe('RadialSlider component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<RadialSlider />);
    expect(toJSON()).toMatchSnapshot();
  });
});
