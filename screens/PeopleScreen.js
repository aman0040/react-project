import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { GiftContext } from '../context/GiftContext';
import { useNavigation } from '@react-navigation/native';

const PeopleScreen = () => {
  const { people, deletePerson } = useContext(GiftContext);
  const navigation = useNavigation();

  const renderPerson = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('IdeaScreen', { personId: item.id })}>
      <Text>{item.name} - {new Date(item.dob).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Text>
      <Button title="Delete" onPress={() => deletePerson(item.id)} />
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={people.sort((a, b) => new Date(a.dob) - new Date(b.dob))}
        renderItem={renderPerson}
        keyExtractor={item => item.id}
      />
      <Button title="Add Person" onPress={() => navigation.navigate('AddPersonScreen')} />
    </View>
  );
};

export default PeopleScreen;
