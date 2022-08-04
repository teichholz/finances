import React from 'react';
import { StyleSheet, Button, FlatList, ListRenderItemInfo } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { openDatabase } from 'expo-sqlite';

type Transaction = {
  name: string,
  amount: number
};

type Transactions = Transaction[];

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finanzübersicht</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList data={data} renderItem={Item}/>
      <Button title="+" />
      <Button title="-" />
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
});
