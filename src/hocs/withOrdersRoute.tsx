import OrdersRoute from 'components/OrdersRoute';
import type { NextComponentType } from 'next';

const withOrdersRoute = <P extends {}>(Component: NextComponentType) =>
  function EnhancedComponent(props: P) {
    return (
      <OrdersRoute>
        <Component {...props} />
      </OrdersRoute>
    );
  };

export default withOrdersRoute;
