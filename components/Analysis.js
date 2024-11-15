import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const sampleAnalysisData = [
  { id: '1', caseName: 'Case A', status: 'Valid', details: 'All conditions met.' },
  { id: '2', caseName: 'Case B', status: 'Pending Review', details: 'Requires additional documents.' },
  { id: '3', caseName: 'Case C', status: 'Invalid', details: 'Mismatch in case details.' },
];

const Analysis = () => {
  const renderItem = ({ item }) => (
    <View style={styles.analysisCard}>
      <Text style={styles.caseName}>{item.caseName}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.details}>Details: {item.details}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Case Analysis</Text>
      <FlatList
        data={sampleAnalysisData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
});

export default Analysis;
