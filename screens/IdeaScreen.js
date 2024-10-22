import React, { useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { GiftContext } from '../context/GiftContext';
import { useRoute, useNavigation } from '@react-navigation/native';

const IdeaScreen = () => {
  const { people, deleteIdea } = useContext(GiftContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { personId } = route.params;

  const person = people.find(p => p.id === personId);

  const renderIdea = ({ item }) => (
    <View>
      <Text>{item.text}</Text>
      <Button title="Delete" onPress={() => deleteIdea(personId, item.id)} />
    </View>
  );

  return (
    <View>
      <Text>{person.name}'s Gift Ideas</Text>
      <FlatList
        data={person.ideas}
        renderItem={renderIdea}
        keyExtractor={item => item.id}
      />
      <Button title="Add Idea" onPress={() => navigation.navigate('AddIdeaScreen', { personId })} />
    </View>
  );
};

export default IdeaScreen;
