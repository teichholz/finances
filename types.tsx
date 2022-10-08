/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Transaction } from './features/transactions/transactionsSlice';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


/**
 * Param list for the root navigator
 */
export type RootStackParamList = {
  Root: NavigatorScreenParams<MoneyStackParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type TransactionCreationKind = "In" | "Out" | "Edit"

/**
 * Param list for all user relevant routes
 */
export type MoneyStackParamList = {
  Overview: undefined;
  TransactionCreation: { kind: TransactionCreationKind, transactionInEdit: (Transaction & { index: number }) | undefined };
};

export type MoneyStackScreenProps<Screen extends keyof MoneyStackParamList> = NativeStackScreenProps<MoneyStackParamList, Screen>;

export type OverviewScreenProps = MoneyStackScreenProps<'Overview'>
export type TransactionScreenProps = MoneyStackScreenProps<'TransactionCreation'>
