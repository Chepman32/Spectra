/**
 * Spectra - Main Application Component
 * A premium iOS photo filtering application
 */

import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from '@components';
import {Colors} from '@constants';
import {useFilterStore} from '@store';
import {filterDefinitions} from '@filters/definitions/filterDefinitions';
import RootNavigator from './src/navigation/RootNavigator';

// Ignore certain warnings in development
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  const setFilters = useFilterStore(state => state.setFilters);

  // Initialize filters on app load
  useEffect(() => {
    setFilters(filterDefinitions);
  }, [setFilters]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ToastProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.backgroundDark}
        />
        <RootNavigator />
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default App;
