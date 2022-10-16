import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';
import { useDispatch } from 'react-redux';
import { add } from '../features/transactions/transactionsSlice';

const db = SQLite.openDatabase("db.db")

// loads transactions from database into the redux state
export default function useDbTransactions() {
  const dispatch = useDispatch();
  const [transactionsLoaded, setTrasactionsLoaded] = useState<boolean>(false);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from transactions;`,
        [],
        (_: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
          const rows = resultSet.rows._array;
          rows.forEach((value) => dispatch(add(value)))
          console.log("transactions loaded from database!");
          setTrasactionsLoaded(true);
        },
        (transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
          console.log(error.message);
          return true;
        }
      );
    });
  }, []);

  return transactionsLoaded;
}
