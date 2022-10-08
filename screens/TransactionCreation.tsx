import React, { useState, } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Dialog, Button, OverlayProps, Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Transaction, add } from '../features/transactions/transactionsSlice'
import { useDispatch } from 'react-redux'
import { TransactionScreenProps } from '../types';
import { DismissKeyboardView, HideKeyboardOnPress } from '../components/DismissKeyboard';

type Kind = "In" | "Out";

type MyProps = {
  onCancel: () => void | undefined,
  type: Kind
}

export type TransactionProps = MyProps & OverlayProps

function kindToFactor(kind: Kind) {
  return kind == "In" ? 1 : -1;
}

export function mkTransaction(name: string, amount: number, date: Date, type: Kind): Transaction {
  return { name, amount: amount * kindToFactor(type), date };
}

export default function TransactionCreation({ route, navigation }: TransactionScreenProps) {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");

  // DateTimePicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  function resetState() {
    setAmount("");
    setName("");
  }

  return (
    <HideKeyboardOnPress>
      <View style={{ alignItems: "center", flex:1  }}>
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
              title="Hinzufügen"
              onPress={_ => { dispatch(add(mkTransaction(name, parseInt(amount), date, route.params.kind))); resetState(); }} />
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

