import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/home';
import ViewDetailsScreen from '../screens/viewDetailScreen';


const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Home Stack */}
        <Stack.Screen name="Home" component={Home} />
        
        {/* Authentication Stack (if needed) */}
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}

        {/* Vendor Stack */}
        {/* <Stack.Screen name="VendorList" component={VendorListScreen} /> */}
        <Stack.Screen name="ViewDetails" component={ViewDetailsScreen} />
      </Stack.Navigator>
  );
};

export default MainNavigation;
