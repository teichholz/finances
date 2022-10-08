import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Transaction = {
  name: string,
  amount: number,
  timestamp: number
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
    edit: (state, action: PayloadAction<Transaction>) => {
      state.value = [...state.value, action.payload]
    },
    clear: (state) => {
      state.value = []
    },
    remove: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((item, index) => index != action.payload)
    } 
  },
})

// Action creators are generated for each case reducer function
export const { add, edit, remove, clear } = transactionsSlice.actions

export default transactionsSlice.reducer
