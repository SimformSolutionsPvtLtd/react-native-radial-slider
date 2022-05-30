import { StyleSheet, View } from 'react-native';
import React from 'react';
import { verticalScale } from '../../../src/theme';

interface variantProps {
  children: React.ReactElement;
}
const VariantCard = (props: variantProps) => (
  <View style={styles.container}>{props.children}</View>
);

export default VariantCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: verticalScale(5),
  },
});
