import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Picker, Platform } from 'react-native';
import { addCase } from './apiService';
import DateTimePicker from '@react-native-community/datetimepicker';

const CaseInput = ({ navigation, route }) => {
  const userEmail = route?.params?.email || 'test@example.com';
  const [caseDetails, setCaseDetails] = useState({
    title: '',
    plaintiff: '',
    defendant: '',  
    case_type: '',
    date_filed: '1/1/2001',
    description: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [response, setResponse] = useState(null); 
  const [loading, setLoading] = useState(false); 


  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setCaseDetails({ ...caseDetails, date_filed: selectedDate.toISOString().split('T')[0] }); 
    }
    setShowDatePicker(false); 
  };

  const handleAnalyzeCase = async () => {
    // const { title, plaintiff, defendant, case_type, date_filed, description } = caseDetails;
    // if (!title || !plaintiff || !defendant || !case_type || !date_filed || !description) {
    //   console.log("Error, Please fill all required fields.")
    //   Alert.alert('Error', 'Please fill all required fields.');
    //   return;
    // }

    try {
      const finalcase_type =
        caseDetails.case_type === 'Other'
          ? caseDetails.specificCaseType
          : caseDetails.case_type;

      if (!finalcase_type) {
        Alert.alert('Error', 'Please specify a valid case type.');
        return;
      }
      const caseData = {
        title: caseDetails.title,
        plaintiff: caseDetails.plaintiff,
        defendant: caseDetails.defendant,
        case_type: finalcase_type,
        date_filed: caseDetails.date_filed,
        case_description: caseDetails.description,
        email: userEmail,
      };
      const response = await addCase(caseData);
      console.log('Response:', response);
      console.log("Case data: ", caseData);
      
      setResponse({
        prediction: response.verdict,
        articlesViolated: response.articles_violated,
        explanation: response.comment,
        case_id: response.case_id,
      });
      setLoading(false);
      Alert.alert('Success', `Case added with ID: ${response.case_id}`);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to add case');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>

        {/* Case Title */}
        <Text style={styles.inputLabel}>Title of Case</Text>
        <TextInput
          style={styles.input}
          value={caseDetails.title}
          onChangeText={(text) => setCaseDetails({ ...caseDetails, title: text })}
          placeholder="Enter a brief title summarizing the case"
        />

        {/* Names of Involved Parties */}
        <Text style={styles.inputLabel}>Plaintiff(s)</Text>
        <TextInput
          style={styles.input}
          value={caseDetails.plaintiff}
          onChangeText={(text) => setCaseDetails({ ...caseDetails, plaintiff: text })}
          placeholder="Enter names of plaintiff(s)"
        />

        <Text style={styles.inputLabel}>Defendant(s)</Text>
        <TextInput
          style={styles.input}
          value={caseDetails.defendant}
          onChangeText={(text) => setCaseDetails({ ...caseDetails, defendant: text })}
          placeholder="Enter names of defendant(s)"
        />

{/* Case Type */}
<Text style={styles.inputLabel}>Case Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={caseDetails.case_type}
            onValueChange={(itemValue) =>
              setCaseDetails({ ...caseDetails, case_type: itemValue, specificCaseType: '' })
            }
          >
            <Picker.Item label="Select Case Type" value="" />
            <Picker.Item label="Criminal" value="Criminal" />
            <Picker.Item label="Civil" value="Civil" />
            <Picker.Item label="Custody" value="Custody" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Show TextInput for "Other" Case Type */}
        {caseDetails.case_type === 'Other' && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.inputLabel}>Specify Case Type</Text>
            <TextInput
              style={styles.input}
              value={caseDetails.specificCaseType}
              onChangeText={(text) =>
                setCaseDetails({ ...caseDetails, specificCaseType: text })
              }
              placeholder="Enter specific case type"
            />
          </View>
        )}

{/* Date Filed */}
<Text style={styles.inputLabel}>Date Filed</Text>
<TouchableOpacity
  onPress={() => setShowDatePicker(true)}
  style={styles.dateField}
>
  <Text style={styles.dateText}>
    {caseDetails.date_filed || 'Select Date'} {/* Placeholder for unselected date */}
  </Text>
</TouchableOpacity>

{/* Render DateTimePicker */}
{showDatePicker && (
  <DateTimePicker
    value={caseDetails.date_filed ? new Date(caseDetails.date_filed) : new Date()} // Fallback to today
    mode="date"
    display="calendar" // Use 'calendar' for Android and Windows
    onChange={(event, selectedDate) => {
      if (event.type === "set") {
        // Ensure only valid selections update the state
        handleDateChange(event, selectedDate);
      }
      setShowDatePicker(false); // Close picker after selection
    }}
  />
)}

        {/* Case Description */}
        <Text style={styles.inputLabel}>Case Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={caseDetails.description}
          onChangeText={(text) => setCaseDetails({ ...caseDetails, description: text })}
          placeholder="Describe the case details"
          multiline
          numberOfLines={6}
        />

         {/* Analyze Button */}
         <TouchableOpacity
          style={styles.analyzeButton}
          onPress={handleAnalyzeCase}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Analyzing...' : 'Analyze New Case'}
          </Text>
        </TouchableOpacity>

        {/* Display Response */}
        {response && (
          <View style={styles.responseContainer}>
            <Text style={styles.responseLabel}>Prediction:</Text>
            <Text style={styles.responseText}>{response.prediction}</Text>

            <Text style={styles.responseLabel}>Articles Violated:</Text>
            <Text style={styles.responseText}>{response.articlesViolated}</Text>

            <Text style={styles.responseLabel}>Explanation:</Text>
            <Text style={styles.responseText}>{response.explanation}</Text>

            {/* Counter Questions Button */}
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => navigation.navigate('ChatInterface', { case_id: response.case_id })}
            >
              <Text style={styles.buttonText}> ⚖️ Need More Clarity? Ask AI LegalBot 🤖</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  dateField: {
    height: 50,
    justifyContent: 'center',
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#34495e',
  },
  analyzeButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    backgroundColor: '#ecf0f1',
  },
  responseLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginTop: 10,
  },
  responseText: {
    fontSize: 14,
    color: '#2c3e50',
    marginTop: 5,
  },
  counterButton: {
    marginTop: 20,
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default CaseInput;
