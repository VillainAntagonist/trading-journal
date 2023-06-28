import { Middleware } from '@reduxjs/toolkit';
import {displayToast} from "../reducers/notifications";

const errorNotification: Middleware = (store) => (next) => (action) => {
    if (action.type.endsWith('rejected')) {
        const error = action.error;
        if (error ) {
            const errorMessage = error.data?.message || error?.message || 'An error occurred';
            store.dispatch(displayToast({message: errorMessage, type: 'error'}));
        }
    }
    return next(action);
};

export default errorNotification;

