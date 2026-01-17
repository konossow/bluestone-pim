import {createSlice, Middleware} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface ProductsState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductsState = {
  value: 0,
  status: 'idle',
};

const STORAGE_KEY = 'products'

const loadState = (): ProductsState | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return undefined;
    }
    return JSON.parse(raw) as ProductsState
  } catch (e) {
    console.warn('Failed to load state from localStorage', e);
  }
}

const saveState = (state: ProductsState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Failed to save state to localStorage', e)
  }
}

const localStorageMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    const result = next(action)
    const state = store.getState()
    saveState(state as any)
    return result
  }

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  }
});

export const {} = productsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProducts = (state: RootState) => state.products.value;

export default productsSlice.reducer;