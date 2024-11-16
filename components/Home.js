import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#800000',
  secondary: '#666',
  background: '#f8f4f0',
  light: 'rgba(255, 255, 255, 0.9)',
  dark: '#000',
  highlight: 'rgba(128, 0, 0, 0.1)',
  gradientStart: '#8B0000',
  gradientEnd: '#4B0000',
};

const FeatureSection = ({ icon, title, description }) => {
  return (
    <View style={styles.featureSection}>
      <View style={styles.featureHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.featureIcon}>{icon}</Text>
        </View>
        <View style={styles.headerDivider} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
};

export default function LandingPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            style={styles.heroBackground}
          >
            <View style={styles.heroContent}>
              <View style={styles.logoContainer}>
                <View style={styles.iconBackground}>
                  <Text style={styles.scalesIcon}>⚖️</Text>
                </View>
                <Text style={styles.title}>JusticeMet</Text>
              </View>
              <Text style={styles.subtitle}>
                Your AI-Powered Judicial Decision Assistant
              </Text>
              <View style={styles.decorativeLine} />
              <Text style={styles.tagline}>
                Empowering legal professionals with advanced AI technology
              </Text>
            </View>
          </LinearGradient>
        </View>
        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <FeatureSection
            icon="📊"
            title="Case Analysis"
            description="Advanced AI algorithms provide comprehensive analysis of case law and precedents."
          />
          <FeatureSection
            icon="🔒"
            title="Secure Handling"
            description="Bank-level encryption ensures your sensitive legal data remains protected."
          />
          <FeatureSection
            icon="🤖"
            title="AI Integration"
            description="Seamlessly integrate AI models for predictive analysis and decision support."
          />
        </View>
        {/* Authentication Section */}
        <View style={styles.authContainer}>
          <TouchableOpacity
            style={[styles.authButton, styles.loginButton]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.authButton, styles.signupButton]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroSection: {
    marginBottom: 24,
  },
  heroBackground: {
    paddingVertical: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBackground: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scalesIcon: {
    fontSize: 36,
    color: '#fff',
  },
  title: {
    fontSize: 38,
    color: colors.light,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.light,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 16,
  },
  decorativeLine: {
    height: 3,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 16,
  },
  tagline: {
    fontSize: 16,
    color: colors.light,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  featureSection: {
    marginBottom: 32,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.highlight,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 24,
  },
  headerDivider: {
    height: 1,
    flex: 1,
    backgroundColor: colors.primary,
    opacity: 0.2,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 20,
    color: colors.primary,
    marginBottom: 8,
    fontWeight: '600',
  },
  featureDescription: {
    fontSize: 16,
    color: colors.secondary,
    lineHeight: 24,
  },
  authContainer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  authButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: colors.highlight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  signupButton: {
    backgroundColor: colors.primary,
  },
  loginButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
