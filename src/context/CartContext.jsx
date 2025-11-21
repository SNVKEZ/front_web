import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

function reducer(state, action) {
  let updatedItems = [];

  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        updatedItems = state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, qty: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }

    case "REMOVE": {
      updatedItems = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }

    case "SET_QTY": {
      updatedItems = state.items.map(i =>
        i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }

    case "CLEAR": {
      localStorage.removeItem("cart");
      return { items: [] };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
