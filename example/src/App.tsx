import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SpeedoMeterVariant, RadialVariant } from './modules';
import { Colors, verticalScale } from './theme';

interface TabProps {
  index: number;
  tabLabel: string;
  activeTabIndex: number;
  setActiveTabIndex: (e: number) => void;
}

const Tab = ({
  index,
  tabLabel,
  activeTabIndex,
  setActiveTabIndex,
}: TabProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        {
          backgroundColor:
            activeTabIndex == index ? Colors.blue : Colors.offWhite,
        },
      ]}
      onPress={() => setActiveTabIndex(index)}>
      <Text
        style={[
          styles.tabLabel,
          {
            color: activeTabIndex == index ? Colors.white : Colors.blue,
          },
        ]}>
        {tabLabel}
      </Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Tab
          index={0}
          tabLabel="RadialSlider"
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
        <Tab
          index={1}
          tabLabel="SpeedoMeter"
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
      </View>
      <View style={styles.screenContainer}>
        {activeTabIndex == 0 ? <RadialVariant /> : <SpeedoMeterVariant />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
  radial: {
    marginTop: 100,
  },
  titleContainer: {
    flex: 0.1,
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 0.5,
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontWeight: '800',
  },
});

export default App;
