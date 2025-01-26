import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'; 
import Home from './screens/home';
import store from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigation from './navigations/mainNavigation';


export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <Provider store={store}> {/* Wrap your app with the Provider */}
        <View style={styles.container}>
          <StatusBar style="hidden" /> {/* Hide the status bar */}
          <MainNavigation/>
        </View>
      </Provider>

    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
