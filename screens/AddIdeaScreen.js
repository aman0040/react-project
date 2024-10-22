import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import { GiftContext } from '../context/GiftContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

const AddIdeaScreen = () => {
  const { addIdea } = useContext(GiftContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { personId } = route.params;

  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [cameraPermission, requestPermission] = Camera.useCameraPermissions();

  const handleSave = () => {
    if (text && image) {
      const aspectRatio = 2 / 3;
      const width = 500; // Example width
      const height = width * aspectRatio;
      addIdea(personId, text, image, width, height);
      navigation.goBack();
    } else {
      alert('Please enter text and capture an image.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Gift Idea" value={text} onChangeText={setText} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 150 }} />}
      <Button title="Take Photo" onPress={requestPermission} />
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddIdeaScreen;
