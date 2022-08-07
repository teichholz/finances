import React, { useState,  } from 'react';
import { StyleSheet,  TextInput, View } from 'react-native';
import { Dialog, Button, OverlayProps } from '@rneui/themed';


export type Transaction = {
  name: string,
  amount: number,
  kind: TransactionKind
};

export type Transactions = Transaction[];

export type TransactionKind = "In" | "Out";

type MyProps = {
  type : TransactionKind,
  onAdd : (transaction : Transaction) => void,
  onCancel: () => void,
}

export type TransactionProps = MyProps & OverlayProps 

export function mkTransaction(name: string, amount: number, kind: TransactionKind): Transaction {
  return { name: name, amount: amount, kind: kind };
} 

export function TransactionDialog(props : TransactionProps) {
  const ttl = props.type == "In" ? "Einnahme" : "Ausgabe";
  const [onAdd, onCancel] = [props.onAdd, props.onCancel]
  const oProps: OverlayProps = props;

  const [amount, setAmount] = useState("0");
  const [name, setName] = useState("Name");


  return <Dialog {...oProps}>

    <Dialog.Title title={`${ttl} hinzufügen`} />
    <TextInput 
      style={styles.textInput}
      keyboardType='default'
      onChangeText={setName}
      value={name}
      />
    <TextInput 
      style={styles.textInput}
      keyboardType='numeric'
      onChangeText={setAmount}
      value={amount}
      />

    <View style={styles.hor}>
      <Dialog.Button 
        title="Hinzufügen" 
        onPress={_ => {onAdd(mkTransaction(name, parseInt(amount), props.type)); onCancel()}} />
      <Dialog.Button 
        title="Abbrechen" 
        onPress={_ => onCancel()} />
    </View>
  </Dialog>
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  hor: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }
});
