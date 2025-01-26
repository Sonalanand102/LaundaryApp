import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; 
import { setLocation, toggleTheme } from '../../actions'; 
import Header from '../../components/Header';
import VendorCard from '@/app/components/VendorCard';
import { getVendors } from '../../services/vendorServices'

  

export default function Home({navigation}) {
  const location = useSelector((state: any) => state.location);  
  const theme = useSelector((state: any) => state.theme); 
  const dispatch = useDispatch(); 
  const filters = useSelector((state: any) => state.filters);
  const [vendorsData, setVendorsData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [service, setService] = useState('');
  const [filteredVendors, setFilteredVendors] = useState(vendorsData);

  const fetchVendors = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getVendors(filters); 
      setVendorsData(data.data);  
      setFilteredVendors(data.data)
      console.log(data.data)
    } catch (err) {
      setVendorsData([]); 
      setFilteredVendors([])
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    console.log(filters)
    const filterData = {
      city: filters?.city, 
      state: filters?.state,
      services: filters?.services,
    };
    fetchVendors(filters); 
  };

  useEffect(() => {
    fetchVendors({});
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#121212' }]}>
      <Header title="Home" onSearch={handleSearch}/>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={filteredVendors}
          renderItem={({ item }) => (
            <VendorCard vendor={item} onPress={() => navigation.navigate('ViewDetails', { vendor: item })} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.vendorList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No vendors available.</Text>
            </View>
          }
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    padding: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
});
