import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {useLoginMutation} from "../store/services/authApi";
import Login from "../pages/Login";

jest.mock('../store/services/authApi', () => ({
    useLoginMutation: jest.fn(),
}));

describe('Login', () => {
    test('renders login form and submits', async () => {
        const loginMock = jest.fn();
        (useLoginMutation as jest.Mock).mockReturnValue([loginMock, { isLoading: false, isError: false, error: null }]);

        render(<Login />);

        const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
        const loginButton = screen.getByRole('button', { name: 'Log in' });

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();

        const testUser = {
            username: 'testuser',
            password: 'testpassword',
        };

        fireEvent.change(usernameInput, { target: { value: testUser.username } });
        fireEvent.change(passwordInput, { target: { value: testUser.password } });

        fireEvent.click(loginButton);

        await waitFor(() => expect(loginMock).toHaveBeenCalledWith(testUser));

        // Additional assertions
        expect(usernameInput).toHaveValue(testUser.username);
        expect(passwordInput).toHaveValue(testUser.password);
        expect(loginButton).toBeDisabled();
    });
});
