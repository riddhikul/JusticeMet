import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import CaseInput from './CaseInput';
import Analysis from './Analysis';
import Header from './Header';
import { searchCase } from './apiService';

const HomeScreen = ({ navigation }) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeSection, setActiveSection] = useState('add-case');

  const handleSearchCase = async () => {
    try {
      const results = await searchCase(searchTitle);
      setSearchResults(results);
      Alert.alert('Search Results', `${results.length} case(s) found`);
    } catch (error) {
      Alert.alert('Error', 'No cases found');
    }
  };

  const NavbarItem = ({ title, section }) => (
    <TouchableOpacity
      style={[styles.navbarItem, activeSection === section && styles.activeNavbarItem]}
      onPress={() => setActiveSection(section)}
    >
      <Text style={[styles.navbarText, activeSection === section && styles.activeNavbarText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    // Your logout logic here, like clearing async storage or authentication token
    Alert.alert('Logged out successfully');
    // You could navigate to the login screen, for example:
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <NavbarItem title="Add Case" section="add-case" />
        <NavbarItem title="Case History" section="case-history" />
        <NavbarItem title="Search Cases" section="search-cases" />
        {/* Logout Button */}
        <TouchableOpacity style={styles.navbarItem} onPress={handleLogout}>
          <Text style={styles.navbarText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        <Header />
        <View style={styles.mainContainer}>
          {activeSection === 'add-case' && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>➕</Text>
                <Text style={styles.sectionTitle}>Add a New Case</Text>
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
                <Text style={styles.cardIcon}>📜</Text>
                <Text style={styles.sectionTitle}>Case History</Text>
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
                <Text style={styles.cardIcon}>🔎</Text>
                <Text style={styles.sectionTitle}>Search Cases</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.input}
                    value={searchTitle}
                    onChangeText={setSearchTitle}
                    placeholder="Enter case title to search"
                    placeholderTextColor="#9E9E9E"
                    onSubmitEditing={handleSearchCase}
                  />
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleSearchCase}
                  >
                    <Text style={styles.buttonText}>Search</Text>
                  </TouchableOpacity>
                </View>
                
                {searchResults.length > 0 && (
                  <View style={styles.resultsContainer}>
                    <Text style={styles.resultsTitle}>Search Results</Text>
                    {searchResults.map((caseItem) => (
                      <View key={caseItem._id} style={styles.resultItemContainer}>
                        <Text style={styles.caseTitle}>{caseItem.title}</Text>
                        <Text style={styles.caseDescription}>
                          {caseItem.case_description}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#800000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexWrap: 'wrap', // Allows items to wrap to the next line on smaller screens
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  navbarItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeNavbarItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFF5E4',
  },
  navbarText: {
    fontSize: 16,
    color: '#FFF5E4',
    opacity: 0.8,
  },
  activeNavbarText: {
    opacity: 1,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF5E4',
  },
  mainContainer: {
    padding: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#800000',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
    color: '#FFF5E4',
  },
  cardBody: {
    padding: 24,
    backgroundColor: '#FDF3E3',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF5E4',
  },
  sectionDescription: {
    fontSize: 16,
    color: '#4E2727',
    marginBottom: 24,
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#4E2727',
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 0, 0.2)',
  },
  actionButton: {
    backgroundColor: '#800000',
    borderRadius: 8,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF5E4',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;
