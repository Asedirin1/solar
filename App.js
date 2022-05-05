import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { Axios } from 'axios';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { enterDetails } from './screens/enterDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Roi } from './screens/ROI';
import { useNavigation } from '@react-navigation/native';




export default function App() {
  
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Enter Details" component={enterDetails} />
        <Stack.Screen name="Return On Investment" component={Roi} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,

  }
});
 