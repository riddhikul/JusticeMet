import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CaseInput from './CaseInput';  // Import the CaseInput component
import Analysis from './Analysis';   // Import the Analysis component
import Header from './Header';       // Import the Header component

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header /> {/* Include the Header here */}

      {/* Case Input Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🔍 Add a New Case</Text>
        <Text style={styles.sectionDescription}>
          Enter case details and analyze them to get valuable insights.
        </Text>
        <CaseInput /> {/* Case input form component */}
      </View>

      {/* Analysis Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📜 Case History</Text>
        <Text style={styles.sectionDescription}>
          View and manage all previously analyzed cases.
        </Text>
        <Analysis /> {/* Displaying the analysis component */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
  },
});

export default HomeScreen;
