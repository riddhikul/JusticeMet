import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import CaseInput from './CaseInput';  // Import the CaseInput component
import Analysis from './Analysis';   // Import the Analysis component
import Header from './Header';       // Import the Header component
import { searchCase } from './apiService';

const HomeScreen = ({ navigation }) => {

  const [searchTitle, setSearchTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchCase = async () => {
    try {
      const results = await searchCase(searchTitle);
      console.log('Search Results:', results);
      setSearchResults(results);
      Alert.alert('Search Results', `${results.length} case(s) found`);
    } catch (error) {
      Alert.alert('Error', 'No cases found');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header /> {/* Include the Header here */}

      {/* Case Input Section (Wrapped in Card UI) */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>🔍 Add a New Case</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.sectionDescription}>
            Enter case details and analyze them to get valuable insights.
          </Text>
          <CaseInput navigation={navigation} />
        </View>
      </View>

      {/* Analysis Section (Wrapped in Card UI) */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>📜 Case History</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.sectionDescription}>
            View and manage all previously analyzed cases.
          </Text>
          <Analysis navigation={navigation} /> {/* Displaying the analysis component */}
        </View>
      </View>

  {/* Search Cases Section */}
  <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>🔎 Search Cases</Text>
        </View>

        {/* Search Input */}
        <View style={styles.cardBody}>
          <Text style={styles.inputLabel}>Search by Title</Text>
          <TextInput
            style={styles.input}
            value={searchTitle}
            onChangeText={setSearchTitle}
            placeholder="Enter case title to search"
            onSubmitEditing={handleSearchCase} // Trigger search on Enter
          />

          {/* Search Button */}
          <TouchableOpacity style={styles.actionButton} onPress={handleSearchCase}>
            <Text style={styles.buttonText}>Search Case</Text>
          </TouchableOpacity>

          {/* Search Results Display */}
          {searchResults.length > 0 && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Search Results:</Text>
              {searchResults.map((caseItem) => (
                <View key={caseItem._id} style={styles.resultItemContainer}>
                  <Text style={styles.resultItem}>
                    <Text style={styles.caseTitle}>{caseItem.title}</Text>: {caseItem.case_description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
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
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeader: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  sectionDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  resultItemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  resultItem: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  caseTitle: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});

export default HomeScreen;
