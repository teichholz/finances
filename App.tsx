import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './store'
import { Provider } from 'react-redux'

import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

const db = SQLite.openDatabase("db.db")

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isDbReady, setDbReady] = useState<boolean>(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists transactions (id integer primary key not null, name text not null, amount integer not null, timestamp integer not null);",
        undefined,
        (_: SQLite.SQLTransaction, _: SQLite.SQLResultSet) => {
          setDbReady(true);
        }
      );
    })
  }, []);

  if (!isLoadingComplete || !isDbReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
