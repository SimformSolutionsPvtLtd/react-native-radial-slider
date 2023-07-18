import { TouchableOpacity } from 'react-native';
import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';
import type { ButtonProps } from './types';

const ButtonContent = (props: ButtonProps) => {
  const { disabled, onPress, style, buttonType, stroke } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      onLongPress={props?.onLongPress}
      onPressOut={props?.onPressOut}
      style={style}>
      <Svg height="30" width="45">
        <G>
          <Circle cx="20" cy="20" r="20" fill="none" />
          <Path
            d={
              buttonType === 'left-btn'
                ? 'M12.5168 17.2727L20.067 24.8485L27.6172 17.2727'
                : 'M12.5168 23.7373L20.067 16.1616L27.6172 23.7373'
            }
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </G>
      </Svg>
    </TouchableOpacity>
  );
};

export default ButtonContent;
