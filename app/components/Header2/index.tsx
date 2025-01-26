import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store';  
import { lightTheme, darkTheme } from '../../theme/theme';  

interface HeaderProps {
  title: string;
  onBackPress: () => void;
}

const Header2: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  const theme = useSelector((state: RootState) => state.theme);  
  
  const currentTheme = theme === 'light' ? lightTheme : darkTheme; 

  return (
    <View style={[styles.headerContainer, { backgroundColor: currentTheme.headerBackground }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={currentTheme.buttonBackground} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: currentTheme.headerTextColor }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    // paddingHorizontal: 16,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header2;
