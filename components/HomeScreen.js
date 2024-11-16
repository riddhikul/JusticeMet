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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  const SidebarItem = ({ icon, title, section }) => (
    <TouchableOpacity
      style={[
        styles.sidebarItem,
        activeSection === section && styles.activeSidebarItem,
        !isSidebarOpen && styles.collapsedSidebarItem
      ]}
      onPress={() => setActiveSection(section)}
    >
      <Text style={[
        styles.sidebarIcon,
        activeSection === section && styles.activeSidebarIcon
      ]}>
        {icon}
      </Text>
      {isSidebarOpen && (
        <Text style={[
          styles.sidebarText,
          activeSection === section && styles.activeSidebarText
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={[styles.sidebar, !isSidebarOpen && styles.sidebarCollapsed]}>
        <TouchableOpacity
          style={[styles.toggleButton, !isSidebarOpen && styles.toggleButtonCollapsed]}
          onPress={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Text style={styles.toggleButtonText}>
            {isSidebarOpen ? '◀' : '▶'}
          </Text>
        </TouchableOpacity>

        {isSidebarOpen && (
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Dashboard</Text>
          </View>
        )}
        
        <View style={styles.sidebarContent}>
          <SidebarItem icon="➕" title="Add Case" section="add-case" />
          <SidebarItem icon="📜" title="Case History" section="case-history" />
          <SidebarItem icon="🔎" title="Search Cases" section="search-cases" />
        </View>
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
    flexDirection: 'row',
    backgroundColor: '#FFF5E4',
  },
  sidebar: {
    width: 240,
    backgroundColor: '#800000',
    paddingTop: 20,
    transition: 'width 0.3s ease',
  },
  sidebarCollapsed: {
    width: 64,
  },
  sidebarHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  sidebarContent: {
    paddingTop: 20,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    padding: 12,
    marginRight: 10,
  },
  toggleButtonCollapsed: {
    alignSelf: 'center',
    marginRight: 0,
  },
  toggleButtonText: {
    color: '#FFF5E4',
    fontSize: 16,
  },
  sidebarTitle: {
    fontSize: 20,
    color: '#FFF5E4',
    fontWeight: '600',
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  collapsedSidebarItem: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  activeSidebarItem: {
    backgroundColor: '#4E2727',
  },
  sidebarIcon: {
    fontSize: 20,
    marginRight: 12,
    opacity: 0.8,
    color: '#FFF5E4',
  },
  activeSidebarIcon: {
    opacity: 1,
  },
  sidebarText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  activeSidebarText: {
    color: '#FFF5E4',
    fontWeight: '500',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
  resultsContainer: {
    marginTop: 24,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4E2727',
    marginBottom: 16,
  },
  resultItemContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 0, 0.1)',
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#800000',
    marginBottom: 8,
  },
  caseDescription: {
    fontSize: 14,
    color: '#4E2727',
    lineHeight: 20,
  },
});

export default HomeScreen;