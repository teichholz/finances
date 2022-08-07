import React, { useState } from 'react';
import { StyleSheet, Button, FlatList, ListRenderItemInfo, TextInput, SafeAreaView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TransactionDialog, Transaction, Transactions, TransactionKind } from '../components/Transaction';
import { RootTabScreenProps } from '../types';
import { Dialog, } from '@rneui/themed';
import { openDatabase } from 'expo-sqlite';


const data: Transactions = [
  { name: "Schuhe",
    amount : 200.0 },
  { name: "Eis",
    amount : -200.0 },
]

const Item = (transaction: ListRenderItemInfo<Transaction>) => (
  <View>
    <Text style={styles.title}>{transaction.item.name}</Text>
    <Text style={styles.title}>{transaction.item.amount}</Text>
  </View>
);


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [visibleIn, setVisibleIn] = useState(false);
  const [visibleOut, setVisibleOut] = useState(false);
  const ts: Transactions = [];
  const [transactions, setTransactions] = useState(ts);

  const tkinds: TransactionKind[] = ["In", "Out"]

  const toggleDialogIn = () => {
    setVisibleIn(!visibleIn);
  };

  const toggleDialogOut = () => {
    setVisibleOut(!visibleOut);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finanzübersicht</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList data={transactions} renderItem={Item}/>
      <View>
        <View style={styles.fixToText}>
          <Button title="+" onPress={toggleDialogIn} />
          <Button title="-" onPress={toggleDialogOut} />
        </View>
      </View>
      <TransactionDialog 
        isVisible={visibleIn} 
        type="In" 
        onAdd={(transaction) => setTransactions([...transactions, transaction])} 
        onCancel={() => setVisibleIn(false)} />
      <TransactionDialog 
        isVisible={visibleOut} 
        type="Out" 
        onAdd={(transaction) => setTransactions([...transactions, transaction])} 
        onCancel={() => setVisibleOut(false)} />

      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
