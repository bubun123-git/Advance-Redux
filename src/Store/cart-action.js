import { uiActions } from "./ui-slice"
import { cartActions } from "./cart-slice"


export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://addvance-redux-default-rtdb.firebaseio.com/cart.json');
            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }
            const data = await response.json();
            return data;

        }

        try {
         const cartData =    await fetchData();
         dispatch(cartActions.replaceCart(cartData));
        }
         catch (error) {
            uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: error.message
            
            })
        }
    }
}


export const sendCartData = (cartData) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data...'
        })
        )

        const sendRequest = async () => {

            const response = await fetch('https://addvance-redux-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cartData)
            });

            if (!response.ok) {
                throw new Error('Sending Cart Data Failed...');
            }

        }
        try {

            await sendRequest();

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
    }
}