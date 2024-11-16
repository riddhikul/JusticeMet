import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';

const { width } = Dimensions.get('window');

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
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.scalesIcon}>⚖️</Text>
            <Text style={styles.title}>JusticeMet</Text>
          </View>
          <Text style={styles.subtitle}>
            Your AI-Powered Judicial Decision Assistant
          </Text>
          <View style={styles.headerAccent} />
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.sectionDivider} />
          </View>
          
          <FeatureSection
            icon="📊"
            title="Case Analysis"
            description="Advanced AI algorithms provide comprehensive analysis of case law and precedents, ensuring thorough legal research and insights."
          />
          <FeatureSection
            icon="🔒"
            title="Secure Handling"
            description="Bank-level encryption and secure protocols safeguard your sensitive legal data with state-of-the-art protection measures."
          />
          <FeatureSection
            icon="🤖"
            title="AI Integration"
            description="Seamlessly integrate powerful AI models for predictive analysis and data-driven decision support in your legal practice."
          />
        </View>

        <View style={styles.authContainer}>
          <TouchableOpacity
            style={[styles.authButton, styles.loginButton]}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.authButton, styles.signupButton]}
            activeOpacity={0.8}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4f0',
  },
  heroSection: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#800000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  scalesIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  title: {
    fontSize: 38,
    color: '#800000',
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontFamily: 'Georgia',
      },
      android: {
        fontFamily: 'serif',
      },
    }),
  },
  subtitle: {
    fontSize: 18,
    color: '#4a4a4a',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        fontFamily: 'Avenir-Medium',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  headerAccent: {
    width: 60,
    height: 4,
    backgroundColor: '#800000',
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius: 2,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#800000',
    fontWeight: 'bold',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        fontFamily: 'Georgia',
      },
      android: {
        fontFamily: 'serif',
      },
    }),
  },
  sectionDivider: {
    height: 2,
    width: 40,
    backgroundColor: '#800000',
    opacity: 0.6,
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
    backgroundColor: 'rgba(128, 0, 0, 0.1)',
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
    backgroundColor: '#800000',
    opacity: 0.2,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 20,
    color: '#800000',
    marginBottom: 8,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        fontFamily: 'Georgia',
      },
      android: {
        fontFamily: 'serif',
      },
    }),
  },
  featureDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    ...Platform.select({
      ios: {
        fontFamily: 'Avenir',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  authContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#800000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
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
    backgroundColor: 'rgba(128, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: '#800000',
  },
  signupButton: {
    backgroundColor: '#800000',
  },
  loginButtonText: {
    color: '#800000',
    fontSize: 18,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        fontFamily: 'Avenir-Heavy',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        fontFamily: 'Avenir-Heavy',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
});