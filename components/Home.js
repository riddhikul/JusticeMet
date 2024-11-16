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
import { ScrollView } from 'react-native-web';

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
            Your AI-Powered Case Analysis Platform
          </Text>
        </View>

        {/* Extended App Description */}
        <ScrollView style={styles.extendedDescriptionContainer}>
          <Text style={styles.extendedDescriptionTitle}>What is JusticeMet?</Text>
          <Text style={styles.extendedDescriptionText}>
            JusticeMet is an AI-powered platform designed to help legal professionals analyze cases and determine whether a defendant is guilty or not. 
            The platform uses advanced AI algorithms to evaluate case details and provide an analysis based on existing legal data.
          </Text>
          <Text style={styles.extendedDescriptionText}>
            With an intuitive chat interface, users can interact with the platform to input case details and receive an immediate verdict on the case. 
            This makes the process of legal analysis faster and more accessible, providing valuable insights for lawyers, judges, and law students.
          </Text>
          <Text style={styles.extendedDescriptionText}>
            JusticeMet is the perfect tool for legal professionals looking for a reliable, fast, and secure way to analyze cases and make informed decisions.
          </Text>
        </ScrollView>

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
    paddingVertical: 10,  // Reduced padding to make the content fit better
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.08,  // Reduced the top margin further to fit the content
  },
  logo: {
    width: 100,  // Reduced logo size for a better fit
    height: 100,
  },
  appName: {
    fontSize: 32,  // Slightly reduced font size for app name
    color: colors.light,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,  // Reduced font size for description
    color: colors.light,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 30,
  },
  extendedDescriptionContainer: {
    paddingHorizontal: 24,
    marginTop: 20,  // Reduced the margin to bring it closer
  },
  extendedDescriptionTitle: {
    fontSize: 20,  // Reduced font size for the description title
    color: colors.light,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  extendedDescriptionText: {
    fontSize: 14,  // Reduced font size for extended text
    color: colors.light,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 10,
  },
  authContainer: {
    width: '90%',
    marginBottom: 20,  // Reduced bottom margin
  },
  authButton: {
    padding: 12,  // Reduced padding to make buttons fit better
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,  // Reduced vertical margin between buttons
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
