import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface NotificationsState {
    message: string;
    type: "success" | "error" | "warning" | "info";
}

const initialState: NotificationsState = {
    message: '',
    type: 'success',
};

const notifications = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayToast: (state, action: PayloadAction<NotificationsState>) => {
           return state = action.payload;
        },
    },
});

export const { displayToast } = notifications.actions;
export default notifications.reducer;
