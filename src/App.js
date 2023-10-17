import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Correct import statement
import { uiActions } from './Store/ui-slice';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';



function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      try {
        dispatch(uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data...'
        }));

        const response = await fetch('https://addvance-redux-default-rtdb.firebaseio.com/cart.json', {
          method: 'PUT',
          body: JSON.stringify(cart)
        });

        if (!response.ok) {
          throw new Error('Sending Cart Data Failed...');
        }

        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Success...',
          message: 'Sent cart data successfully...'
        }));

          

      } catch (error) {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: error.message
        }));
      }
    };

    sendCartData();
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}  {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}


export default App;
