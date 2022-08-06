import React, { useState } from 'react';
import { StyleSheet, Button, FlatList, ListRenderItemInfo, TextInput, SafeAreaView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Dialog, } from '@rneui/themed';
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
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("0");

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finanzübersicht</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList data={data} renderItem={Item}/>
      <View>
        <View style={styles.fixToText}>
          <Button title="+" onPress={toggleDialog} />
          <Button title="-" onPress={toggleDialog} />
        </View>
      </View>
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
      >
        <Dialog.Title title="Ausgabe hinzufügen"/>
        <Text>Dialog body text. Add relevant information here.</Text>
        <TextInput 
           style={styles.textInput}
           keyboardType='numeric'
           onChangeText={setAmount}
           value={amount}
           maxLength={10}  //setting limit of input
        />
      </Dialog>
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
