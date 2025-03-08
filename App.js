import React from 'react';
import { SafeAreaView } from 'react-native';
import ReceiptScanner from './components/ReceiptScanner';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReceiptScanner />
    </SafeAreaView>
  );
}
