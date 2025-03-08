import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Firebase from 'firebase';
import 'firebase/firestore';
import * as MLKit from 'expo-ml-kit';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

const db = Firebase.firestore();

export default function ReceiptScanner() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      extractText(result.uri);
    }
  };

  const extractText = async (uri) => {
    const recognizedText = await MLKit.recognizeTextAsync(uri);
    setExtractedText(recognizedText.text);

    await db.collection('expenses').add({
      text: recognizedText.text,
      timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Scan Receipt" onPress={pickImage} />
      <Text>{extractedText}</Text>
    </View>
  );
}
