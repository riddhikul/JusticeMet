// components/Header.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import logo from '../assets/justice-logo.png'; // Import the image

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>LegalAI Assistant</Text>
      <Text style={styles.subtitle}>Your Intelligent Legal Companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default Header;
