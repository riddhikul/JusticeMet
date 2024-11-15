import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { addCase, searchCase } from './apiService';


const CaseInput = ({ navigation }) => {
  const [caseDetails, setCaseDetails] = useState({
    title: '',
    description: '',
    evidence: '',
  });

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

  const handleAnalyzeCase = async () => {
    try {
      const caseData = {
        title: caseDetails.title,
        case_description: caseDetails.description,
        evidence: caseDetails.evidence.split(','), // Convert evidence to an array
      };
      const response = await addCase(caseData);
      console.log("response: ", response);
      Alert.alert('Success', `Case added with ID: ${response.case_id}`);
      navigation.navigate('ChatInterface'); // Navigate after successful case addition
    } catch (error) {
      Alert.alert('Error', 'Failed to add case');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Case Title</Text>
        <TextInput
          style={styles.input}
          value={caseDetails.title}
          onChangeText={(text) => setCaseDetails({ ...caseDetails, title: text })}
          placeholder="Enter case title"
        />

        <Text style={styles.inputLabel}>Case Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={caseDetails.description}
          onChangeText={(text) => setCaseDetails({ ...caseDetails, description: text })}
          placeholder="Describe the case details"
          multiline
          numberOfLines={6}
        />

        <Text style={styles.inputLabel}>Evidence</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={caseDetails.evidence}
          onChangeText={(text) => setCaseDetails({ ...caseDetails, evidence: text })}
          placeholder="List relevant evidence"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={handleAnalyzeCase}
        >
          <Text style={styles.buttonText}>Analyze New Case</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Search Cases</Text>
        <Text style={styles.inputLabel}>Search by Title</Text>
            <TextInput
      style={styles.input}
      value={searchTitle}
      onChangeText={setSearchTitle}
      placeholder="Enter case title to search"
      onSubmitEditing={handleSearchCase}  // This will trigger the search when Enter is pressed
    />


        <TouchableOpacity style={styles.actionButton} onPress={handleSearchCase}>
          <Text style={styles.buttonText}>Search Case</Text>
        </TouchableOpacity>

        {searchResults.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Search Results:</Text>
            {searchResults.map((caseItem) => (
              <Text key={caseItem._id} style={styles.resultItem}>
                {caseItem.title}: {caseItem.case_description}
              </Text>
            ))}
          </View>
        )}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  analyzeButton: {
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

  actionButton: {
    backgroundColor: '#3498db', 
    paddingVertical: 15,         
    borderRadius: 10,           
    alignItems: 'center',       
    marginTop: 20,              
  },
  buttonText: {
    color: '#fff',              
    fontSize: 18,               
    fontWeight: 'bold',         
  },
});

export default CaseInput;
