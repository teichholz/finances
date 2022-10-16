import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db")

export default function useDb() {
  const [isDbReady, setDbReady] = useState<boolean>(false);

  // ensure database is setup
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists transactions (id integer primary key not null, name text not null, amount integer not null, timestamp integer not null);",
        undefined,
        (unused: SQLite.SQLTransaction, _: SQLite.SQLResultSet) => {
          setDbReady(true);
          console.log("database is set up!")
        },
        (transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
          console.log(error.message);
          return true;
        }
      );
    })
  }, []);

  return isDbReady;
}
