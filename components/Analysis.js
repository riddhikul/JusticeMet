// components/Analysis.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Analysis = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Case Analysis</Text>
      <Text style={styles.resultText}>Analysis Result: Case is valid for review</Text>
      <TouchableOpacity style={styles.button}>
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
  resultText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 20,
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
