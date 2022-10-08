import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Transaction = {
  name: string,
  amount: number,
  date: Date
};

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
      state.value = [...state.value, action.payload]
    },
    clear: (state) =>{
      state.value = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, clear } = transactionsSlice.actions

export default transactionsSlice.reducer
