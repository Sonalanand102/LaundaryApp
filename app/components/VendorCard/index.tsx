import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Carousel from 'react-native-reanimated-carousel'; 

interface Vendor {
  name: string;
  location: string;
  imageUrls: string[]; 
  services: string[];  
}

interface VendorCardProps {
  vendor: Vendor;
  onPress: onPress;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width; 

  const renderItem = ({ item, index }: { item: string, index: number }) => {
    if (!item) {
      return (
        <View style={styles.carouselItem}>
          <Text>No image available</Text> 
        </View>
      );
    }

    return (
      <View style={styles.carouselItem}>
        <Image
          source={{ uri: item }}
          style={[styles.vendorImage, { width: screenWidth }]}
          onError={() => console.log('Image failed to load')} 
        />
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      {/* Carousel Slider */}
      <Carousel
        loop
        width={screenWidth}
        height={200}  
        onSnapToItem={(index) => setCurrentIndex(index)} 
        data={vendor.images} 
        renderItem={renderItem} 
      />

      {/* Vendor Information */}
      <View style={styles.vendorInfo}>
        <Text style={styles.vendorName}>{vendor.name}</Text>

        {/* Location and Service */}
        <View style={styles.vendorDetails}>
          <View style={styles.locationWrapper}>
            <Ionicons name="location-outline" size={20} color="#888" />
            <Text style={styles.vendorLocation}>{vendor?.address?.city}, {vendor?.address?.state}</Text>
          </View>
        </View>

        {/* Services Offered */}
        <Text style={styles.serviceTitle}>Services Offered:</Text>
        <FlatList
          data={vendor.services}
          renderItem={({ item }) => (
            <View style={styles.serviceItemContainer}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#4CAF50" />
              <Text style={styles.serviceItem}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* View Details Button */}
      <TouchableOpacity style={styles.viewDetailsButton} onPress={onPress}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginVertical: 10,
    marginHorizontal: 16,
    paddingBottom: 10,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  vendorImage: {
    height: 200,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  vendorInfo: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  vendorDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorLocation: {
    marginLeft: 6,
    fontSize: 14,
    color: '#888',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
    marginBottom: 6,
  },
  serviceItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 6,
  },
  viewDetailsButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VendorCard;
