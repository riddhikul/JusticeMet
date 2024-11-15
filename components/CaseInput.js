import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CaseInput = ({ navigation }) => {
  const [caseDetails, setCaseDetails] = useState({
    title: '',
    description: '',
    evidence: '',
  });

  const handleAnalyzeCase = () => {
    navigation.navigate('ChatInterface'); 
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
});

export default CaseInput;
