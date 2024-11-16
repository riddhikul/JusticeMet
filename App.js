import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen'; // Import HomeScreen
import CaseInput from './components/CaseInput'; // Import CaseInput
import Analysis from './components/Analysis'; // Import Analysis
import ChatInterface from './components/ChatInterface'; // Import ChatInterface
import Home from './components/Home'; // Import Landing Page (Home)
import ImageCheck from './components/ImageCheck'; // Import ImageCheck (if needed)
import LoginScreen from './components/LoginScreen'; // Import Login Screen
import SignupScreen from './components/SignupScreen'; // Import Signup Screen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
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
