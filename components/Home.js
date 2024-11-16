import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const colors = {
  primary: '#800000',
  light: '#FFFFFF',
  gradientStart: '#8B0000',
  gradientEnd: '#4B0000',
};

export default function LandingPage() {
  const navigation = useNavigation();

  // State to track the hover state for web (not used on mobile)
  const [isLoginHovered, setLoginHovered] = useState(false);
  const [isSignupHovered, setSignupHovered] = useState(false);
  
  // State to track the pressed state for mobile press effects
  const [isLoginPressed, setLoginPressed] = useState(false);
  const [isSignupPressed, setSignupPressed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradientBackground}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/image.png')} // Adjust path as per your project structure
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>JusticeMet</Text>
          <Text style={styles.description}>
            Your AI-Powered Judicial Decision Assistant
          </Text>
        </View>

        {/* Authentication Buttons */}
        <View style={styles.authContainer}>
          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.authButton,
              styles.loginButton,
              isLoginHovered && styles.loginButtonHovered,
              isLoginPressed && styles.loginButtonPressed,
            ]}
            onPress={() => navigation.navigate('Login')}
            onMouseEnter={() => setLoginHovered(true)} // Hover effect for web
            onMouseLeave={() => setLoginHovered(false)} // Hover effect for web
            onPressIn={() => setLoginPressed(true)} // Mobile "press" effect
            onPressOut={() => setLoginPressed(false)} // Mobile "release" effect
          >
            <Text
              style={[
                styles.authButtonText,
                isLoginHovered && styles.authButtonTextHovered,
                isLoginPressed && styles.authButtonTextPressed,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[
              styles.authButton,
              styles.signupButton,
              isSignupHovered && styles.signupButtonHovered,
              isSignupPressed && styles.signupButtonPressed,
            ]}
            onPress={() => navigation.navigate('Signup')}
            onMouseEnter={() => setSignupHovered(true)} // Hover effect for web
            onMouseLeave={() => setSignupHovered(false)} // Hover effect for web
            onPressIn={() => setSignupPressed(true)} // Mobile "press" effect
            onPressOut={() => setSignupPressed(false)} // Mobile "release" effect
          >
            <Text
              style={[
                styles.authButtonText,
                isSignupHovered && styles.authButtonTextHovered,
                isSignupPressed && styles.authButtonTextPressed,
                !isSignupHovered && styles.authButtonTextDefault, // Default text color when not hovered
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.15,
  },
  logo: {
    width: 120,
    height: 120,
  },
  appName: {
    fontSize: 36,
    color: colors.light,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 18,
    color: colors.light,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  authContainer: {
    width: '90%',
    marginBottom: 40,
  },
  authButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    transitionDuration: '0.3s', // Smooth transition for hover effect (for web)
  },
  loginButton: {
    borderColor: 'rgba(255, 255, 255, 0.7)', // Border color matching signup button
    borderWidth: 1,
    backgroundColor: 'transparent', // Transparent background for the login button
  },
  signupButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Signup button remains as is
  },
  loginButtonHovered: {
    borderColor: colors.primary, // Change border color when hovered
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light background on hover
  },
  signupButtonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Darker background when hovered
  },
  loginButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Pressed button effect
  },
  signupButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Pressed button effect
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)', // Text color matching the border of login button and background of signup button
  },
  authButtonTextHovered: {
    color: colors.primary, // Change text color when hovered
  },
  authButtonTextPressed: {
    color: colors.primary, // Change text color when pressed
  },
  authButtonTextDefault: {
    color: colors.primary, // Default text color when not hovered
  },
});
