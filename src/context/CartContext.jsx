import React, { createContext, useContext, useReducer, useEffect } from "react";
import { idbGet, idbSet } from "../utils/idb";

const CartContext = createContext();

const initialState = {
  items: [],
  addresses: [],
  draftOrder: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ALL":
      return { ...state, items: action.payload };

    case "ADD": {
      const exists = state.items.find(i => i.id === action.payload.id);
      let updated;

      if (exists) {
        updated = state.items.map(i =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        updated = [...state.items, { ...action.payload, qty: 1 }];
      }
      return { ...state, items: updated };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
      };

    case "SET_QTY":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, qty: action.payload.qty }
            : i
        ),
      };

    case "SET_PRICE":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, price: action.payload.price }
            : i
        ),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "SET_ADDRESSES":
      return { ...state, addresses: action.payload };

    case "SET_DRAFT":
      return { ...state, draftOrder: action.payload };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const cart = (await idbGet("cart")) || [];
      dispatch({ type: "SET_ALL", payload: cart });

      const addresses = (await idbGet("addresses")) || [];
      dispatch({ type: "SET_ADDRESSES", payload: addresses });

      const draft = await idbGet("draftOrder");
      if (draft) dispatch({ type: "SET_DRAFT", payload: draft });
    })();
  }, []);

  useEffect(() => {
    idbSet("cart", state.items);
  }, [state.items]);

  useEffect(() => {
    idbSet("addresses", state.addresses);
  }, [state.addresses]);

  useEffect(() => {
    idbSet("draftOrder", state.draftOrder);
  }, [state.draftOrder]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
