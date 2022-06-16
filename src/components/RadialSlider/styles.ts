import { StyleSheet } from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  statusView: {
    position: 'absolute',
    top: -10,
    right: -25,
  },
  statusValueText: {
    fontSize: moderateScale(18),
    marginTop: verticalScale(-5),
    marginBottom: verticalScale(-5),
  },
  valueText: {
    fontSize: moderateScale(40),
  },
  valueUnit: {
    fontSize: moderateScale(15),
    marginLeft: horizontalScale(5),
  },
  statusValueUnit: {
    fontSize: moderateScale(12),
    marginTop: verticalScale(-5),
    paddingLeft: horizontalScale(2),
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  large_header: {
    color: Colors.darkBlue,
    fontWeight: '600',
    fontSize: moderateScale(27),
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    color: Colors.darkCharcoal,
    fontWeight: '400',
    fontSize: moderateScale(14),
  },
  hideValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hideCenterContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(-20),
  },
  hideStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(3),
  },
  subTitleWidth: {
    textAlign: 'center',
    width: horizontalScale(120),
  },
  centerText: {
    flexDirection: 'column',
  },
  centerTextView: {
    marginTop: verticalScale(110),
    marginRight: horizontalScale(20),
  },
  speedValueUnit: {
    paddingLeft: horizontalScale(0),
  },
});
