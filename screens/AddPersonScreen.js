import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { GiftContext } from '../context/GiftContext';
import { useNavigation } from '@react-navigation/native';

const AddPersonScreen = () => {
  const { addPerson } = useContext(GiftContext);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleSave = () => {
    if (name && dob) {
      addPerson(name, dob);
      navigation.goBack();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <DatePicker mode="calendar" onDateChange={setDob} />
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddPersonScreen;
