// components/HomeScreen.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Header from './Header'; // Import the Header component

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header /> {/* Include the Header here */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate('CaseInput')}
        >
          <Text style={styles.buttonText}>Analyze New Case</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.buttonText}>Case History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  buttonContainer: {
    padding: 20,
  },
  mainButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
