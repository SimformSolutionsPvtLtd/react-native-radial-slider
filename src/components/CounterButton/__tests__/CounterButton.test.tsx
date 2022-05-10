//@ts-nocheck
import React from 'react';
import { render } from '@testing-library/react-native';
import { CounterButton } from '../CounterButton';

jest.useFakeTimers();

describe('CounterButton component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<CounterButton />);
    expect(toJSON()).toMatchSnapshot();
  });
});
