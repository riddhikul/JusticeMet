import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import CaseInput from './CaseInput'; // Import CaseInput component
import Analysis from './Analysis';  // Import Analysis component
import Header from './Header';      // Import Header component
import { searchCase } from './apiService'; // Import API service

const HomeScreen = ({ navigation }) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeSection, setActiveSection] = useState('add-case'); // Tracks current section
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state

  const handleSearchCase = async () => {
    try {
      const results = await searchCase(searchTitle);
      console.log('Search Results:', results);
      setSearchResults(results);
      Alert.alert('Search Results', `${results.length} case(s) found`);
    } catch (error) {
      Alert.alert('Error', 'No cases found');
    }
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={[styles.sidebar, !isSidebarOpen && styles.sidebarCollapsed]}>
        {/* Toggle Button */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Text style={styles.toggleButtonText}>{isSidebarOpen ? '❌' : '☰'}</Text>
        </TouchableOpacity>

        {/* Sidebar Items */}
        {isSidebarOpen && (
          <>
            <Text style={styles.sidebarTitle}>Menu</Text>
            <TouchableOpacity
              style={[
                styles.sidebarItem,
                activeSection === 'add-case' && styles.activeSidebarItem,
              ]}
              onPress={() => setActiveSection('add-case')}
            >
              <Text style={styles.sidebarText}>➕ Add Case</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sidebarItem,
                activeSection === 'case-history' && styles.activeSidebarItem,
              ]}
              onPress={() => setActiveSection('case-history')}
            >
              <Text style={styles.sidebarText}>📜 Case History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sidebarItem,
                activeSection === 'search-cases' && styles.activeSidebarItem,
              ]}
              onPress={() => setActiveSection('search-cases')}
            >
              <Text style={styles.sidebarText}>🔎 Search Cases</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        <Header /> {/* Keep the header */}
        {activeSection === 'add-case' && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>🔍 Add a New Case</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.sectionDescription}>
                Enter case details and analyze them to get valuable insights.
              </Text>
              <CaseInput navigation={navigation} />
            </View>
          </View>
        )}
        {activeSection === 'case-history' && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>📜 Case History</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.sectionDescription}>
                View and manage all previously analyzed cases.
              </Text>
              <Analysis navigation={navigation} />
            </View>
          </View>
        )}
        {activeSection === 'search-cases' && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>🔎 Search Cases</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.inputLabel}>Search by Title</Text>
              <TextInput
                style={styles.input}
                value={searchTitle}
                onChangeText={setSearchTitle}
                placeholder="Enter case title to search"
                onSubmitEditing={handleSearchCase}
              />
              <TouchableOpacity style={styles.actionButton} onPress={handleSearchCase}>
                <Text style={styles.buttonText}>Search Case</Text>
              </TouchableOpacity>
              {searchResults.length > 0 && (
                <View style={styles.resultsContainer}>
                  <Text style={styles.resultsTitle}>Search Results:</Text>
                  {searchResults.map((caseItem) => (
                    <View key={caseItem._id} style={styles.resultItemContainer}>
                      <Text style={styles.resultItem}>
                        <Text style={styles.caseTitle}>{caseItem.title}</Text>: {caseItem.case_description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Layout for sidebar + main content
    backgroundColor: '#FFF5E4', // Cream background
  },
  sidebar: {
    width: 200,
    backgroundColor: '#800000', // Maroon sidebar
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    transition: 'width 0.3s ease', // Smooth collapse
  },
  sidebarCollapsed: {
    width: 60,
    justifyContent: 'flex-start',
  },
  toggleButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    backgroundColor: '#4E2727',
    padding: 8,
    borderRadius: 8,
  },
  toggleButtonText: {
    color: '#FFF5E4',
    fontSize: 20,
  },
  sidebarTitle: {
    fontSize: 18,
    color: '#FFF5E4', // Cream text
    marginBottom: 20,
    fontWeight: '600',
  },
  sidebarItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent', // Default background
  },
  activeSidebarItem: {
    backgroundColor: '#4E2727', // Darker maroon for active item
  },
  sidebarText: {
    color: '#FFF5E4', // Cream text
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FDF3E3', // Light cream
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeader: {
    backgroundColor: '#800000', // Maroon header
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFF5E4', // Cream text
  },
  sectionDescription: {
    fontSize: 16,
    color: '#4E2727', // Dark maroon
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#4E2727',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#D7CCC8',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFF',
    color: '#4E2727',
  },
  actionButton: {
    backgroundColor: '#800000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF5E4',
    fontSize: 18,
    fontWeight: '600',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4E2727',
    marginBottom: 10,
  },
  resultItemContainer: {
    backgroundColor: '#F9EFE3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  resultItem: {
    fontSize: 16,
    color: '#4E2727',
  },
  caseTitle: {
    fontWeight: 'bold',
    color: '#800000',
  },
});

export default HomeScreen;
