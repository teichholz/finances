import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo, TextInput, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors'
import { TransactionDialog, } from '../components/Transaction';
import { Transaction, Transactions } from '../features/transactions/transactionsSlice'
import { OverviewScreenProps, TransactionScreenProps } from '../types';
import { Button, FAB, ListItem } from '@rneui/themed';
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';
import { openDatabase } from 'expo-sqlite';

import { useSelector, useDispatch } from 'react-redux'
import { add } from '../features/transactions/transactionsSlice'



const Item = (item: ListRenderItemInfo<Transaction>) => {
  const trans = item.item;
  return (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>{trans.name} </ListItem.Title>
        <ListItem.Subtitle style={{ color: trans.amount >= 0 ? "green" : "red" }}>{trans.amount} €</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
};


export default function TabOneScreen({ route, navigation }: OverviewScreenProps) {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transactions.value)

  const sum = transactions.map(t => t.amount).reduce((sum, amnt) => sum + amnt, 0)


  return (
      <View style={styles.container}>


        <View style={{ width: "100%" }}>
          <FlatList data={transactions} renderItem={Item} />
        </View>


        <View>
          <Button
            title={`${sum} €`}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: sum >= 0 ? Colors.positiveGreen : Colors.negativeRed,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginVertical: 30,
            }}
          />

          <View style={styles.fixToText}>

            <FAB
              icon={{ name: 'add', color: 'white' }}
              color="green"
              size="large"
              onPress={(event) => navigation.navigate("TransactionCreation", { kind: "In" })}
            />

            <FAB
              icon={{ name: 'remove', color: 'white' }}
              color="red"
              size="large"
              onPress={(event) => navigation.navigate("TransactionCreation", { kind: "Out" })}
            />

          </View>
        </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fixToText: {
    width: "50%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
});
