import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageCheck = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Homehero.jpg')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
  },
});

export default ImageCheck;