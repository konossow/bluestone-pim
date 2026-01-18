import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Product } from '../model/Product';

type ProductsState = Product[];

const initialState: ProductsState = [
  {
    "name": "b0006se5bq",
    "number": "singing coach unlimited",
    "description": "singing coach unlimited - electronic learning products (win me nt 2000 xp)",
    "images": [
      {
        "url": "https://picsum.photos/400/300",
        "name": "singing coach"
      },
      {
        "url": "https://broken.link.for.testing.notexistingtopleveldomain/400/300",
        "name": "front side"
      }
    ]
  },
  {
    "name": "b00021xhzw",
    "number": "adobe after effects professional 6.5 upgrade from standard to professional",
    "description": "upgrade only; installation of after effects standard new disk caching tools speed up your interactive work save any combination of animation parameters as presets",
    "images": []
  },
  {
    "name": "b00021xhzw",
    "number": "domino designer/developer v5.0",
    "description": "reference domino designer/developer r5 doc pack includes the following titles: application development with domino designer (intermediate-advanced) 536 pages",
    "images": [
      {
        "url": "https://picsum.photos/400/300",
        "name": "cover"
      }
    ]
  }
];

const STORAGE_KEY = 'products';

const loadState = (): ProductsState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialState;
  } catch {
    return initialState;
  }
};

const saveState = (state: ProductsState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Failed to save state to localStorage', e)
  }
}

export const productsSlice = createSlice({
  name: 'products',
  initialState: loadState(),
  reducers: {
    updateProduct: (products, action: PayloadAction<Product>) => {
      const index = products.findIndex(p => p.name === action.payload.name)
      if (index !== -1) {
        products[index] = action.payload;
        saveState(products);
      }
    },
  }
});

export const {updateProduct} = productsSlice.actions;

export default productsSlice.reducer;
