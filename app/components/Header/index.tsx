import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {toggleTheme } from '../../slice/themeSlice'; 
import { setLocation } from '@/app/actions';
import * as Location from 'expo-location';
import Icon from '@expo/vector-icons/FontAwesome'
import { setCity, setState, setServices } from '../../slice/filterSlice'; 

interface HeaderProps {
  title: string;

}

const Header: React.FC<HeaderProps> = ({ title, onSearch }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [locationInput, setLocationInput] = useState<string>('');  
  const [serviceInput, setServiceInput] = useState<string>(''); 
  const [userLocation, setUserLocation] = useState<string>(''); 
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme);
  

  const toggleAnimation = new Animated.Value(0); 

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });

      const city = address.city || '';
      const state = address.region || '';
      

      const locationName = `${address.city}, ${address.region}`;
      setUserLocation(locationName);  
      setLocationInput(locationName); 
      dispatch(setLocation(locationName)); 
      setLoading(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    Animated.timing(toggleAnimation, {
      toValue: theme === 'light' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [theme]);

const handleSearch =  () => {
     onSearch();
  };

  const toggleThemeHandler = () => {
    dispatch(toggleTheme()); 
  };

  const containerStyle = [
    styles.headerContainer,
    theme === 'light' ? styles.lightHeader : styles.darkHeader,
  ];
  const textStyle = theme === 'light' ? styles.lightText : styles.darkText;

  const toggleStyle = {
    transform: [
      {
        translateX: toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30], 
        }),
      },
    ],
  };

  return (
    <View style={containerStyle}>
      <View style={styles.locationContainer}>
 
            <View style={{flexDirection : "row", justifyContent : "space-between"}}>
                 <View>
                    <Text style={[styles.title, textStyle]}>{title}</Text>
                    {loading ? (
                        <ActivityIndicator size="small" color={theme === 'light' ? '#000' : '#fff'} />
                    ) : (
                    <Text style={[styles.locationText, textStyle]}>
                    {userLocation || 'Loading...'}
                    </Text>
                    )}
                </View>

                <TouchableOpacity style={theme === 'light' ?  [styles.toggleButton, {backgroundColor : "#fff"}] : [styles.toggleButton , {backgroundColor : "#000"}]} onPress={toggleThemeHandler}>
                    <Animated.View style={[styles.toggleIcon, toggleStyle]}>
                    <Icon
                        name={theme === 'light' ? 'sun-o' : 'moon-o'}
                        size={22}
                        color={theme === 'light' ? '#FFA500' : '#fff'} 
                    />
                    </Animated.View>
                </TouchableOpacity>
            </View>
         

      </View>
      <View style={styles.filterContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, theme === 'light' ? styles.lightInput : styles.darkInput]}
            placeholder="Enter Preferred Location"
            placeholderTextColor={theme === 'light' ? '#aaa' : '#666'}
            value={locationInput}
            onChangeText={(item) => {
              setLocationInput(item);
              dispatch(setCity(item));
            }}  
          />
          <TextInput
            style={[styles.input, theme === 'light' ? styles.lightInput : styles.darkInput]}
            placeholder="Enter Preferred Service"
            placeholderTextColor={theme === 'light' ? '#aaa' : '#666'}
            value={serviceInput}
            onChangeText={(item) => {
              setServiceInput(item);
              dispatch(setServices(item));
            }}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Toggle Theme Button with animation */}
     
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: '#fff', // Set background color to white for light theme
  },
  lightHeader: {
    backgroundColor: '#f9f9f9',
  },
  darkHeader: {
    backgroundColor: '#1e293b',
  },
  locationContainer: {
    marginBottom: 12,
    // alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    width: '75%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  lightInput: {
    borderColor: '#ddd',
    color: '#333',
  },
  darkInput: {
    backgroundColor: '#2d3748',
    borderColor: '#555',
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  toggleButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    // paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 25,
    alignItems: 'center',
    // justifyContent: 'flex-end',
    flexDirection: 'row', 
    // justifyContent: 'flex-end', 
  },
  toggleIcon: {
    marginRight: 30,
    borderRadius : 30,
    padding : 3
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
