import { useContext } from 'react';
import OrdersContext, { OrdersContextValue } from 'contexts/Orders';

const useOrders = (): OrdersContextValue => {
  const ordersContext = useContext(OrdersContext);
  if (!ordersContext) {
    throw new Error('Forgot to wrap component in OrderContext');
  }

  return ordersContext;
};

export default useOrders;
