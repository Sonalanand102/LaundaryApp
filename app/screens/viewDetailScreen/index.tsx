import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux'; 
import { RootState } from './store'; 
import { RootStackParamList } from './types'; 
import Header2 from '@/app/components/Header2';
import { lightTheme, darkTheme } from '../../theme/theme';

type ViewDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ViewDetails'>;

interface ViewDetailsScreenProps {
  route: ViewDetailsScreenRouteProp;
}

const ViewDetailsScreen: React.FC<ViewDetailsScreenProps> = ({ route, navigation }) => {
  const { vendor } = route.params; 
  
  const theme = useSelector((state: RootState) => state.theme); 
  
  const currentTheme = theme === 'light' ? lightTheme : darkTheme; 

  const renderImageItem = ({ item }: { item: string }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.coverImage} />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.headerBackground }]}>
      <Header2 title="Details" onBackPress={() => navigation.goBack()} theme={currentTheme} />

      {/* Image carousel using FlatList */}
      {vendor?.images && vendor.images.length > 0 ? (
        <FlatList
          data={vendor?.images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      ) : (
        <Text style={[styles.noImagesText, { color: currentTheme.textColor }]}>No images available</Text>
      )}

      <View style={styles.vendorInfo}>
        <Text style={[styles.vendorName, { color: currentTheme.textColor }]}>{vendor?.name}</Text>

        {/* Location with Icon */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={currentTheme.subtitleColor} />
          <Text style={[styles.vendorLocation, { color: currentTheme.subtitleColor }]}>{vendor?.address?.formattedAddress}</Text>
        </View>

        <Text style={[styles.vendorDescription, { color: currentTheme.descriptionColor }]}>{vendor?.description}</Text>

        <View style={styles.contactInfo}>
          <Text style={[styles.contactLabel, { color: currentTheme.descriptionColor }]}>Email: {vendor?.email}</Text>
          <Text style={[styles.contactLabel, { color: currentTheme.descriptionColor }]}>Phone: {vendor?.phone}</Text>
        </View>

        <Text style={[styles.serviceTitle, { color: currentTheme.textColor }]}>Services Offered:</Text>
        <FlatList
          data={vendor?.services}
          renderItem={({ item }) => (
            <View style={styles.serviceItemContainer}>
              <Ionicons name="checkmark-circle-outline" size={18} color={currentTheme.buttonBackground} />
              <Text style={[styles.serviceItem, { color: currentTheme.descriptionColor }]}>{item.name},</Text>
              <Text style={[styles.serviceItem, { color: currentTheme.descriptionColor }]}>Starts at: {item.price}</Text>

            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Back to previous screen button */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: currentTheme.buttonBackground }]}
        onPress={() => navigation.goBack()}>
        <Text style={[styles.backButtonText, { color: currentTheme.buttonTextColor }]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  coverImage: {
    width: 300,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  imageContainer: {
    marginRight: 16,
  },
  vendorInfo: {
    marginTop: 16,
  },
  vendorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  vendorLocation: {
    fontSize: 16,
    marginLeft: 6,
  },
  vendorDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  contactInfo: {
    marginBottom: 16,
  },
  contactLabel: {
    fontSize: 14,
    marginBottom: 6,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  serviceItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceItem: {
    fontSize: 14,
    marginLeft: 6,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noImagesText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
});

export default ViewDetailsScreen;
