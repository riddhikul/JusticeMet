import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/human_rights.gif')} // Adjust the path if needed
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Universal Declaration of Human Rights</Text>

      {/* Description */}
      <Text style={styles.description}>
        This is a brief introduction to human rights, a declaration for equality, dignity, and justice.
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// export default Home;


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    imageContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerImage: {
      width: '80%',
      height: 200,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 24,
    },
    button: {
      backgroundColor: '#f0e0b0', // Button color similar to the yellow in your design
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
    },
  });
  

export default Home;
