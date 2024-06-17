import { createContext, useEffect, useState } from 'react';
import type { FCC } from 'types/react';
import ProfileOrder from 'services/order';
import { OrderItem, SearchOrder } from 'types/order';

type OrdersSearch = typeof ProfileOrder.search;

interface State {
  list: OrderItem[];
  total: number;
}

// const initItem = {
//   deliveryStatus: null,
//   purchaseDateFrom: null,
//   purchaseDateTo: null,
//   searchText: null,
//   pageSize: 10,
//   pageNumber: 1,
// };

const initialState: State = {
  list: [],
  total: 0,
};

export interface OrdersContextValue extends State {
  orders: OrdersSearch;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

if (process.env.NODE_ENV === 'development') {
  OrdersContext.displayName = 'OrdersContext';
}

const OrdersProvider: FCC = (props) => {
  const { children } = props;
  const [state] = useState<State>(initialState);

  const orders = async (data: SearchOrder) => {
    const response = await ProfileOrder.search(data);
    // const newList = response.data.content;
    // setState((state) => ({ ...state, list: newList, total: newList.length }));

    return response;
  };

  useEffect(() => {
    // orders(initItem);
  }, []);

  return (
    <OrdersContext.Provider value={{ ...state, orders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersContext as default, OrdersProvider };
