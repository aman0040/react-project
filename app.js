import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PeopleScreen from './screens/PeopleScreen';
import AddPersonScreen from './screens/AddPersonScreen';
import IdeaScreen from './screens/IdeaScreen';
import AddIdeaScreen from './screens/AddIdeaScreen';
import { GiftProvider } from './context/GiftContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GiftProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PeopleScreen">
          <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
          <Stack.Screen name="AddPersonScreen" component={AddPersonScreen} />
          <Stack.Screen name="IdeaScreen" component={IdeaScreen} />
          <Stack.Screen name="AddIdeaScreen" component={AddIdeaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GiftProvider>
  );
}
