import React from 'react';
import { render } from '@testing-library/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {displayToast} from "../store/reducers/notifications";
import {toast} from "react-toastify";
import store from "../store";
import Notification from "../components/Notification";
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
    },
}))

describe('Notification', () => {
    it('displays a success toast with the provided message', () => {
        const mockMessage = 'Success message';
        const mockType = 'success';

        // Mock useDispatch to return a mock function
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

        // Mock useSelector to return the desired values from the Redux state
        (useSelector as jest.Mock).mockReturnValue({ message: mockMessage, type: mockType });

        render(<Notification />);

        // Verify that the toast.success function is called with the correct arguments
        expect(toast.success).toHaveBeenCalledWith(mockMessage, expect.anything());

        // Verify that the displayToast action creator function is called with the correct arguments
        expect(mockDispatch).toHaveBeenCalledWith(displayToast({ message: '', type: 'success' }));
    });
});
