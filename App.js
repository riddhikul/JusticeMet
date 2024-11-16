import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Import Screens
import HomeScreen from './components/HomeScreen';
import CaseInput from './components/CaseInput';
import Analysis from './components/Analysis';
import ChatInterface from './components/ChatInterface';
import Home from './components/Home';
import ImageCheck from './components/ImageCheck';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false); // To ensure navigation state is ready
  const [navigationState, setNavigationState] = useState(null); // Store navigation state

  useEffect(() => {
    // Load the saved navigation state from AsyncStorage
    const loadNavigationState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('navigationState');
        if (savedState) {
          setNavigationState(JSON.parse(savedState)); // Parse and set state
        }
      } catch (error) {
        console.error('Error loading navigation state:', error);
      } finally {
        setIsReady(true); // Ensure we have finished loading state
      }
    };

    loadNavigationState();
  }, []);

  const handleNavigationStateChange = async (state) => {
    // Save the current navigation state to AsyncStorage
    try {
      const stateToSave = JSON.stringify(state);
      await AsyncStorage.setItem('navigationState', stateToSave);
    } catch (error) {
      console.error('Error saving navigation state:', error);
    }
  };

  if (!isReady) {
    // Show a loading screen while we load the navigation state
    return null; // Or return a loading indicator
  }

  return (
    <NavigationContainer
      initialState={navigationState} // Restore the navigation state
      onStateChange={handleNavigationStateChange} // Save the navigation state on change
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Landing Page */}
        <Stack.Screen name="main" component={Home} />

        {/* Signup and Login */}
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Main App Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CaseInput" component={CaseInput} />
        <Stack.Screen name="Analysis" component={Analysis} />
        <Stack.Screen name="ChatInterface" component={ChatInterface} />

        {/* Miscellaneous Screens */}
        <Stack.Screen name="image" component={ImageCheck} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
