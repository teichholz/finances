import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TransactionCreationKind } from '../../types';


export type Transaction = {
  id?: number, 
  name: string,
  amount: number,
  timestamp: number
};

export function mkTransaction(name: string, amount: number, date: Date, type: TransactionCreationKind): Transaction {
  return { name, amount: amount * kindToFactor(type), timestamp: date.getTime() };
}

function kindToFactor(kind: TransactionCreationKind) {
  return kind == "Out" ? -1 : 1;
}

export type TransactionsState = {
  value: Transactions
}

export type Transactions = Transaction[];


const initialState: TransactionsState = {
  value: [],
}



export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Transaction>) => {
      const ts: Transaction[] = [...state.value];
      let index = ts.length;
      for (let i = 0; i < ts.length; ++i) {
        if (action.payload.timestamp > ts[i].timestamp) {
          index = i;
          break;
        }
      }
      ts.splice(index, 0, action.payload)
      state.value = ts;
    },
    clear: (state) => {
      state.value = []
    },
    fill: (state) => {
      const ts: Transaction[] = []
      for (const i of Array(20).keys()) {
        ts.push(mkTransaction("Name " + i, i, new Date(), "In"))
      }
      state.value = ts;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((item, index) => index != action.payload)
    } 
  },
})

// Action creators are generated for each case reducer function
export const { add,  remove, clear, fill } = transactionsSlice.actions

export default transactionsSlice.reducer
