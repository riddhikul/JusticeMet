// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen'; // Import HomeScreen component
import CaseInput from './components/CaseInput'; // Import CaseInput component
import Analysis from './components/Analysis'; // Import Analysis component
import ChatInterface from './components/ChatInterface'; // Import ChatInterface component

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CaseInput" component={CaseInput} />
        <Stack.Screen name="Analysis" component={Analysis} />
        <Stack.Screen name="ChatInterface" component={ChatInterface} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
