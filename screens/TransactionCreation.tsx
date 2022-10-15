import React, { useState, } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Dialog, Button, OverlayProps, Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

import { add, remove, mkTransaction } from '../features/transactions/transactionsSlice'
import { useDispatch } from 'react-redux'
import { TransactionScreenProps } from '../types';
import { HideKeyboardOnPress } from '../components/DismissKeyboard';


export default function TransactionCreation({ route, navigation }: TransactionScreenProps) {
  const dispatch = useDispatch()

  const editMode = route.params.kind === "Edit"
  const transaction = route.params.transactionInEdit || mkTransaction("", 0, new Date(), route.params.kind)

  const [amount, setAmount] = useState(transaction.amount.toString());
  const [name, setName] = useState(transaction.name);
  const [date, setDate] = useState(new Date(transaction.timestamp));

  const onChange = (_: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  function resetState() {
    setAmount("");
    setName("");
    setDate(new Date())
  }

  return (
    <HideKeyboardOnPress>
      <View style={{ alignItems: "center", flex: 1 }}>
        <View style={{ width: "80%", marginTop: 40 }}>

          <Text>Name</Text>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            keyboardType='default'
            onChangeText={setName}
            value={name}
          />

          <Text>Betrag</Text>
          <TextInput
            placeholder="Betrag"
            style={styles.textInput}
            keyboardType='numeric'
            onChangeText={setAmount}
            value={amount}
          />

          <Text>Datum</Text>
          <View>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              style={styles.dateInput}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          </View>

          <View style={styles.hor}>
            <Dialog.Button
              title={editMode ? "Speichern" : "Hinzufügen"}
              onPress={_ => {
                const transaction = mkTransaction(name, parseInt(amount), date, route.params.kind)
                if (editMode) {
                  dispatch(remove(route.params.transactionInEdit!.index))
                  dispatch(add(transaction))
                } else {
                  dispatch(add(transaction));
                }
                resetState();
              }} />
            <Dialog.Button
              title="Abbrechen"
              onPress={_ => { resetState(); navigation.goBack() }} />
          </View>
        </View>
      </View></HideKeyboardOnPress>
  )
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  label: {
    alignSelf: "flex-end",
  },
  textInput: {
    height: 40,
    margin: 12,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
  },
  dateInput: {
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  hor: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

