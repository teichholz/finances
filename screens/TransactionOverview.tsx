import { StyleSheet, FlatList, ListRenderItemInfo, TouchableWithoutFeedback, ViewToken } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors'
import { add, Transaction } from '../features/transactions/transactionsSlice'
import { OverviewScreenProps, TransactionScreenProps } from '../types';
import { Button, FAB, ListItem } from '@rneui/themed';

import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../features/transactions/transactionsSlice'
import { RootState } from '../store';
import { useCallback, useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';
import useDbTransactions from '../hooks/useDbTransactions';
import { css } from '../constants/Styles';
const db = SQLite.openDatabase("db.db")

type ViewableItems = { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }


export default function TransactionOverview({ route, navigation }: OverviewScreenProps) {
  const dispatch = useDispatch()
  const transactions = useSelector((state: RootState) => state.transactions.value)
  const transactionsLoaded = useDbTransactions();

  const [topMostIndex, setTopMostIndex] = useState<number>(0)
  const [sum, setSum] = useState<number>(0);
  const [topMostTimestamp, setTopMostTimestamp] = useState<number>(0);

  const calculateAndSetTransactionsSum = (ts: Transaction[]) => {
    const sumTs = (ts: Transaction[]) => ts.map(t => t.amount).reduce((sum, amnt) => sum + amnt, 0);
    setSum(sumTs(ts));
  };

  const deleteTransaction = (item: ListRenderItemInfo<Transaction>) => {
    const transaction = item.item;
    const indexInList = item.index;
    if (transaction.id) {
      db.transaction(
        (tx) => {
          tx.executeSql("delete from transactions where id = ?", [transaction.id!],
            (unused1: any, unused2: any) => {
              dispatch(remove(indexInList))
            },
            (transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
              console.log(error.message);
              return true;
            });
        },
      );
    } else {
      dispatch(remove(indexInList));
    }
  };


  useEffect(() => {
    if (transactions.length > 0) {
      calculateAndSetTransactionsSum(transactions.slice(topMostIndex));
      setTopMostTimestamp(transactions[topMostIndex].timestamp);
    }
  }, [topMostIndex])

  useEffect(() => {
    calculateAndSetTransactionsSum(transactions);
    if (transactions.length > 0) {
      setTopMostTimestamp(transactions[0].timestamp);
    } 
  }, [transactions])


  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const setIndexOfTopMostViewableTransaction = useCallback(({ viewableItems, _ }: ViewableItems) => {
    if (viewableItems.length > 0) {
      const token: ViewToken = viewableItems[0];
      setTopMostIndex(token.index!)
    }
  }, []);

  if (!transactionsLoaded) {
    return null;
  }

  return (
    <View style={[css.styles.flex1, css.styles.flexColumnSpaceBetween]}>
      <View style={[css.styles.flexColumnCenter, { height: "4%", backgroundColor: "#f7f7fa" }]}>
        {transactions.length > 0 &&
          <Text style={{ marginLeft: "2%" }}>{new Date(topMostTimestamp).toLocaleDateString("de-DE", dateTimeFormatOptions)}</Text>
        }
      </View>

      <FlatList
        onViewableItemsChanged={setIndexOfTopMostViewableTransaction}
        data={transactions}
        renderItem={(item: ListRenderItemInfo<Transaction>) => {
          const trans = item.item;
          return (
            <ListItem.Swipeable
              rightContent={
                <Button
                  title="Delete"
                  onPress={() => { deleteTransaction(item); }}
                  icon={{ name: 'delete', color: 'white' }}
                  buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                />
              }>
              <TouchableWithoutFeedback onPress={() =>
                navigation.navigate("TransactionCreation", { kind: "Edit", transactionInEdit: { ...item.item, index: item.index } })}>
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "bold" }}>{trans.name} </ListItem.Title>
                  <ListItem.Subtitle style={{ color: trans.amount >= 0 ? "green" : "red" }}>{trans.amount} €</ListItem.Subtitle>
                </ListItem.Content>
              </TouchableWithoutFeedback>
              <ListItem.Chevron />
            </ListItem.Swipeable>
          )
        }} />

      <View style={css.styles.alignItemsCenter}>
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

        <View style={[css.styles.flexRowSpaceEvenly, styles.widthAndMargin]}>

          <FAB
            icon={{ name: 'add', color: 'white' }}
            color="green"
            size="large"
            onPress={(event) => { navigation.navigate("TransactionCreation", { kind: "In" }); }}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  widthAndMargin: {
    width: "50%",
    marginBottom: 20
  },
});
