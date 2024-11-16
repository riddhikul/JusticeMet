import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { BASE_URL } from './apiService';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const ChatInterface = ({ navigation, route }) => {
  const { case_id } = route.params;
  console.log("case: ", case_id);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your legal assistant. Please describe your case, and I'll help analyze it.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  const fetchBotResponse = async (userMessage) => {
    console.log("User message: ", userMessage);
    try {
        setIsTyping(true);

        // First, add the user message to the state
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: userMessage.text, isBot: false, timestamp: new Date() }
        ]);

        // Axios POST request to get the bot response
        const response = await axios.post(`${BASE_URL}/cases/${case_id}/chat`, {
            user_query: userMessage.text,
        });

        console.log("Axios response data: ", response.data);

        // Check if the response contains the expected chatbot_response
        if (response.data && response.data.chatbot_response) {
            // Add the bot response to the state
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: prevMessages.length + 2, text: response.data.chatbot_response, isBot: true, timestamp: new Date() },
            ]);
        } else {
            throw new Error(`Invalid response format: ${JSON.stringify(response.data)}`);
        }
    } catch (error) {
        console.error('Error fetching bot response:', error);
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: prevMessages.length + 2,
                text: 'Sorry, I am having trouble right now. Please try again later.',
                isBot: true,
                timestamp: new Date(),
            },
        ]);
    } finally {
        setIsTyping(false);
    }
};

  // const simulateBotResponse = (userMessage) => {
  //   setIsTyping(true);
  //   setTimeout(() => {
  //     let botResponse = '';
  //     if (userMessage.toLowerCase().includes('evidence')) {
  //       botResponse =
  //         "Could you please provide more specific details about the evidence? This will help me analyze the case more accurately.";
  //     } else if (userMessage.toLowerCase().includes('witness')) {
  //       botResponse =
  //         "Witness testimony is crucial. How many witnesses are involved, and what is the nature of their testimonies?";
  //     } else if (userMessage.toLowerCase().includes('guilty')) {
  //       botResponse =
  //         "Let me analyze the information provided to assess the likelihood of guilt or innocence based on legal precedents.";
  //     } else {
  //       botResponse =
  //         "Thank you for providing that information. Could you share any additional details that might be relevant to the case?";
  //     }
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         id: prev.length + 2,
  //         text: botResponse,
  //         isBot: true,
  //         timestamp: new Date(),
  //       },
  //     ]);
  //     setIsTyping(false);
  //   }, 1500);
  // };

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: inputText.trim(),
        isBot: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [
        ...prev,
        { id: messages.length + 1, text: userMessage.text, isBot: false, timestamp: new Date() },
      ]);
      setInputText('');
      // simulateBotResponse(inputText);
      fetchBotResponse(userMessage);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const MessageBubble = ({ message }) => (
    <View style={[styles.messageRow, message.isBot ? styles.botRow : styles.userRow]}>
      {message.isBot && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>B</Text>
        </View>
      )}
      <View style={[styles.messageBubble, message.isBot ? styles.botBubble : styles.userBubble]}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')} // Replace 'Home' with the actual route name of your home screen
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Legal Assistant</Text>
            <Text style={styles.headerSubtitle}>AI-Powered Case Analysis</Text>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesList}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && (
            <View style={[styles.messageRow, styles.botRow]}>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.typingText}>Analyzing...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#95a5a6"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, backgroundColor: '#e9f3f7' }, // Light blue color for a soft, clean look
  header: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  backButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  backButtonText: { color: '#4a90e2', fontWeight: 'bold' },
  headerTitle: { color: '#ffffff', fontSize: screenWidth < 375 ? 18 : 20, fontWeight: 'bold' },
  headerSubtitle: { color: '#dbe7f3', fontSize: screenWidth < 375 ? 12 : 14, marginTop: 5 },
  messagesContainer: { flex: 1 },
  messagesList: { padding: 10 },
  messageRow: { flexDirection: 'row', marginVertical: 5 },
  botRow: { alignSelf: 'flex-start' },
  userRow: { alignSelf: 'flex-end' },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: { color: '#ffffff', fontWeight: 'bold' },
  messageBubble: {
    maxWidth: screenWidth < 375 ? '85%' : '75%',
    padding: screenWidth < 375 ? 8 : 10,
    borderRadius: 15,
    elevation: 3,
  },
  botBubble: {
    backgroundColor: '#e9f5ff', // Light blue
    borderTopLeftRadius: 0,
    borderColor: '#4a90e2',
    borderWidth: 1,
  },
  userBubble: {
    backgroundColor: '#a8e6cf', // Light green
    borderTopRightRadius: 0,
  },
  messageText: { color: '#34495e', fontSize: 14 }, // Dark text for contrast
  timestamp: { fontSize: 10, color: '#7f8c8d', marginTop: 5, alignSelf: 'flex-end' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: screenWidth < 375 ? 8 : 10,
    backgroundColor: '#ffffff', // White input area
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  input: {
    flex: 1,
    backgroundColor: '#f7f9fc', // Soft gray
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    fontSize: 14,
    borderColor: '#dbe7f3',
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: '#4a90e2', // Consistent blue
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonDisabled: { backgroundColor: '#bdc3c7' },
  sendButtonText: { color: '#ffffff', fontWeight: 'bold' },
  typingText: { color: '#34495e', marginTop: 5, marginLeft: 10 },
});

export default ChatInterface;
