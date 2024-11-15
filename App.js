// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
// import axios from 'axios';
import logo from './assets/justice-logo.png';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={logo}
          style={styles.logo}
        />
        <Text style={styles.title}>LegalAI Assistant</Text>
        <Text style={styles.subtitle}>Your Intelligent Legal Companion</Text>
      </View>
      
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
    </SafeAreaView>
  );
};

const CaseInput = ({ navigation }) => {
  const [caseDetails, setCaseDetails] = useState({
    title: '',
    description: '',
    evidence: '',
  });
  const [loading, setLoading] = useState(false);

  const handleAnalyzeCase = async () => {
    if (!caseDetails.title || !caseDetails.description || !caseDetails.evidence) {
      alert('Please fill out all case details.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://your-api-endpoint.com/predict', {
        caseDetails,
      });
      const { verdict, explanation } = response.data;
      navigation.navigate('Analysis', { verdict, explanation });
    } catch (error) {
      console.error(error);
      alert('Error occurred while processing the case.');
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Analyze Case</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Analysis = ({ route }) => {
  const { verdict, explanation } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.analysisContainer}>
        <View style={styles.verdictContainer}>
          <Text style={styles.verdictLabel}>Verdict</Text>
          <Text style={styles.verdictText}>{verdict || 'No Verdict'}</Text>
          <View style={styles.confidenceBar}>
            <View style={[styles.confidenceFill, { width: '75%' }]} />
          </View>
          <Text style={styles.confidenceText}>75% Confidence</Text>
        </View>

        <View style={styles.explanationContainer}>
          <Text style={styles.sectionTitle}>Analysis Explanation</Text>
          <Text style={styles.explanationText}>{explanation || 'No Explanation Available'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CaseInput" component={CaseInput} />
        <Stack.Screen name="Analysis" component={Analysis} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
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
  buttonContainer: {
    paddingHorizontal: 30,
    marginTop: 40,
  },
  mainButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 12,
    alignItems: 'center',
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 20,
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  analyzeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  analysisContainer: {
    padding: 20,
  },
  verdictContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  verdictLabel: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  verdictText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 15,
  },
  confidenceBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#3498db',
  },
  confidenceText: {
    marginTop: 10,
    color: '#7f8c8d',
  },
  explanationContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  explanationText: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
});
