import { Middleware } from '@reduxjs/toolkit';
import {displayToast} from "../reducers/notifications";

const errorNotification: Middleware = (store) => (next) => (action) => {

    if (action.type.endsWith('rejected')) {
        const { originalStatus, status, data } = action.payload;
        const error = action.error;
        if (error ) {
            console.log(error)
            const errorMessage = data.error || error?.message || 'An error occurred';
            store.dispatch(displayToast({message: errorMessage, type: 'error'}));
        }
    }
    return next(action);
};

export default errorNotification;

