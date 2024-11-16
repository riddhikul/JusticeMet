import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { BASE_URL } from './apiService';

const Analysis = ({ navigation, route }) => {
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const userEmail = route?.params?.email || 'test@example.com';

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/${userEmail}/cases`); 
        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }
        const data = await response.json();
        setAnalysisData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [userEmail]);

  const renderItem = ({ item }) => (
    <View style={styles.analysisCard}>
      <Text style={styles.caseName}>{item.caseName}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.details}>Details: {item.details}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Case Analysis</Text>
      <FlatList
        data={analysisData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.analysisList}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeScreen')} 
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  analysisList: {
    marginBottom: 20,
  },
  analysisCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  caseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#95a5a6',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Analysis;
