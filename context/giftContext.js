import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';

export const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const storedPeople = await AsyncStorage.getItem('people');
      if (storedPeople) {
        setPeople(JSON.parse(storedPeople));
      }
    };
    loadData();
  }, []);

  const savePeople = async (newPeople) => {
    setPeople(newPeople);
    await AsyncStorage.setItem('people', JSON.stringify(newPeople));
  };

  const addPerson = (name, dob) => {
    const newPerson = {
      id: randomUUID(),
      name,
      dob,
      ideas: [],
    };
    savePeople([...people, newPerson]);
  };

  const deletePerson = (id) => {
    const updatedPeople = people.filter(person => person.id !== id);
    savePeople(updatedPeople);
  };

  const addIdea = (personId, text, img, width, height) => {
    const updatedPeople = people.map(person => {
      if (person.id === personId) {
        return {
          ...person,
          ideas: [
            ...person.ideas,
            { id: randomUUID(), text, img, width, height },
          ],
        };
      }
      return person;
    });
    savePeople(updatedPeople);
  };

  const deleteIdea = (personId, ideaId) => {
    const updatedPeople = people.map(person => {
      if (person.id === personId) {
        return {
          ...person,
          ideas: person.ideas.filter(idea => idea.id !== ideaId),
        };
      }
      return person;
    });
    savePeople(updatedPeople);
  };

  return (
    <GiftContext.Provider value={{ people, addPerson, deletePerson, addIdea, deleteIdea }}>
      {children}
    </GiftContext.Provider>
  );
};
