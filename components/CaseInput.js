import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { addCase } from './apiService';


const CaseInput = ({ navigation }) => {
  const [caseDetails, setCaseDetails] = useState({
    title: '',
    description: '',
    evidence: '',
  });



  const handleAnalyzeCase = async () => {
    try {
      const caseData = {
        title: caseDetails.title,
        case_description: caseDetails.description,
        evidence: caseDetails.evidence.split(','), // Convert evidence to an array
      };
      const response = await addCase(caseData);
      navigation.navigate('ChatInterface'); 
      console.log("response: ", response);
      Alert.alert('Success', `Case added with ID: ${response.case_id}`);
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
  card: {
    margin: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
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
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  resultItem: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
});

export default CaseInput;
