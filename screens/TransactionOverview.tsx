import { StyleSheet, FlatList, ListRenderItemInfo, TouchableWithoutFeedback, ViewToken } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors'
import { Transaction } from '../features/transactions/transactionsSlice'
import { OverviewScreenProps, TransactionScreenProps } from '../types';
import { Button, FAB, ListItem } from '@rneui/themed';
import { openDatabase } from 'expo-sqlite';

import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../features/transactions/transactionsSlice'
import { RootState } from '../store';
import { useCallback, useEffect, useState } from 'react';

type ViewableItems = { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }

export default function TransactionOverview({ route, navigation }: OverviewScreenProps) {
  const dispatch = useDispatch()
  const transactions = useSelector((state: RootState) => state.transactions.value)

  const [topMostIndex, setTopMostIndex] = useState<number>(0)
  const [sum, setSum] = useState<number>(0);
  const [topMostTimestamp, setTopMostTimestamp] = useState<number>(0);

  useEffect(() => {
    if (transactions.length > 0) {
      setSum(sumTs(transactions.slice(topMostIndex)));
      setTopMostTimestamp(transactions[topMostIndex].timestamp);
    }
  }, [topMostIndex])

  useEffect(() => {
    if (transactions.length > 0) {
      setSum(sumTs(transactions));
      setTopMostTimestamp(transactions[0].timestamp);
    }
  }, [transactions])

  const sumTs = (ts: Transaction[]) => ts.map(t => t.amount).reduce((sum, amnt) => sum + amnt, 0)

  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const onViewableItemsChanged = useCallback(({ viewableItems, _ }: ViewableItems) => {
    if (viewableItems.length > 0) {
      const token: ViewToken = viewableItems[0];
      setTopMostIndex(token.index!)
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", justifyContent: "center", height: "4%", backgroundColor: "#f7f7fa" }}>
        {transactions.length > 0 &&
          <Text style={{ marginLeft: "2%" }}>{new Date(topMostTimestamp).toLocaleDateString("de-DE", options)}</Text>
        }
      </View>

      <FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        data={transactions}
        renderItem={(item: ListRenderItemInfo<Transaction>) => {
          const trans = item.item;
          return (
            <ListItem.Swipeable
              rightContent={
                <Button
                  title="Delete"
                  onPress={() => { dispatch(remove(item.index)); }}
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

      <View style={{ alignItems: "center" }}>
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
  container: {
    flex: 1,
    flexDirection: "column",
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
