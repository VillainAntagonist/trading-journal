import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from "../layouts/authenticated/Navbar";
import {useLogoutMutation} from "../store/services/authApi";

jest.mock('../store/services/authApi'); // Mock the logout API module

describe('Navbar', () => {
    test('renders and triggers handleToggle on button click', () => {
        const handleToggleMock = jest.fn();
        const logoutMutationMock = jest.fn();

        // Mock the useLogoutMutation hook to return the mock mutation function
        (useLogoutMutation as jest.Mock).mockReturnValue([logoutMutationMock, { isLoading: false }]);

        render(<Navbar handleToggle={handleToggleMock} />);

        const menuButton = screen.getByRole('button', { name: 'Menu' });
        const logoutButton = screen.getByRole('button', { name: 'Logout' });

        fireEvent.click(menuButton);
        fireEvent.click(logoutButton);

        expect(handleToggleMock).toHaveBeenCalledTimes(1);
        expect(logoutMutationMock).toHaveBeenCalledTimes(1);
    });
});
