import React, { useState, } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Dialog, Button, OverlayProps, Input } from '@rneui/themed';
import { Transaction } from '../features/transactions/transactionsSlice'
import DateTimePicker from '@react-native-community/datetimepicker';

type Kind = "In" | "Out";

type MyProps = {
  onAdd: (transaction: Transaction) => void,
  onCancel: () => void,
  type: Kind
}

export type TransactionProps = MyProps & OverlayProps

function kindToFactor(kind: Kind) {
  return kind == "In" ? 1 : -1;
}

export function TransactionDialog(props: TransactionProps) {
  const ttl = props.type == "In" ? "Einnahme" : "Ausgabe";
  const [onAdd, onCancel] = [props.onAdd, props.onCancel]
  const oProps: OverlayProps = props;

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

  return <Dialog  {...oProps} >

    <Dialog.Title titleStyle={styles.title} title={`${ttl} hinzufügen`} />

      <View style={{ alignItems: "flex-start" }}>

        <Text>Name</Text>
        <Input
          placeholder="Name"
          style={styles.textInput}
          keyboardType='default'
          onChangeText={setName}
          value={name}
          errorMessage=""
        />

        <Text>Betrag</Text>
        <Input
          placeholder="Betrag"
          style={styles.textInput}
          keyboardType='numeric'
          onChangeText={setAmount}
          value={amount}
          errorMessage=""
        />

        <Text>Datum</Text>
        <DateTimePicker
          testID="dateTimePicker"
          style={styles.textInput}
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />

        <View style={styles.hor}>
          <Dialog.Button
            title="Hinzufügen"
            onPress={_ => { onAdd(mkTransaction(name, parseInt(amount), date, props.type)); resetState(); }} />
          <Dialog.Button
            title="Abbrechen"
            onPress={_ => { onCancel(); resetState(); }} />
        </View>
      </View>
  </Dialog>
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 30,
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
    width: "60%",
    // borderWidth: 1,
    padding: 10,
  },
  hor: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
