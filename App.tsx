/**
 * Spectra - Main Application Component
 * A premium iOS photo filtering application
 */

import React, {useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from '@components';
import {Colors} from '@constants';
import {useFilterStore} from '@store';
import {filterDefinitions} from '@filters/definitions/filterDefinitions';

// Screens (to be implemented)
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const setFilters = useFilterStore(state => state.setFilters);

  // Initialize filters on app load
  useEffect(() => {
    setFilters(filterDefinitions);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ToastProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.backgroundDark}
        />
        <SafeAreaView style={styles.container}>
          {/* Temporary splash screen - will be replaced with full navigation */}
          <View style={styles.centered}>
            <Text style={styles.logo}>SPECTRA</Text>
            <Text style={styles.tagline}>Transform Every Moment</Text>
            <Text style={styles.status}>App Foundation Ready</Text>
          </View>
        </SafeAreaView>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.brandPurple,
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '300',
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    marginTop: 16,
  },
  status: {
    fontSize: 14,
    color: Colors.success,
    marginTop: 32,
    fontWeight: '500',
  },
});

export default App;
