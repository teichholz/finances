import React, { useState,  } from 'react';
import { StyleSheet,TextInput, View, Text } from 'react-native';
import { Dialog, Button, OverlayProps, Input } from '@rneui/themed';
import {Transaction} from '../features/transactions/transactionsSlice'

type Kind = "In" | "Out";

type MyProps = {
  onAdd : (transaction : Transaction) => void,
  onCancel: () => void,
  type: Kind
}

export type TransactionProps = MyProps & OverlayProps 

function kindToFactor(kind: Kind) {
  return kind == "In" ? 1 : -1;
}

export function mkTransaction(name: string, amount: number, type: Kind ): Transaction {
  return { name, amount: amount * kindToFactor(type) };
} 

export function TransactionDialog(props : TransactionProps) {
  const ttl = props.type == "In" ? "Einnahme" : "Ausgabe";
  const [onAdd, onCancel] = [props.onAdd, props.onCancel]
  const oProps: OverlayProps = props;

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");

  function resetState() {
    setAmount(""); 
    setName("");
  } 

  return <Dialog onBackdropPress={onCancel} {...oProps} >

    <Dialog.Title titleStyle={styles.title} title={`${ttl} hinzufügen`} />

    <Input 
      label="Name"
      placeholder="Name"
      style={styles.textInput}
      keyboardType='default'
      onChangeText={setName}
      value={name}
      errorMessage=""
      />

    <Input 
      label="Betrag"
      placeholder="Betrag"
      style={styles.textInput}
      keyboardType='numeric'
      onChangeText={setAmount}
      value={amount}
      errorMessage=""
      />

    <View style={styles.hor}>
      <Dialog.Button 
        title="Hinzufügen" 
        onPress={_ => {onAdd(mkTransaction(name, parseInt(amount), props.type)); resetState();}} />
      <Dialog.Button 
        title="Abbrechen" 
        onPress={_ => {onCancel(); resetState();}} />
    </View>
  </Dialog>
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputGroup: {
  },
  label: {
    alignSelf: "flex-end",
  },
  textInput: {
    height: 40,
    marginTop: 12,
    // borderWidth: 1,
    padding: 10,
  },
  hor: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }
});
