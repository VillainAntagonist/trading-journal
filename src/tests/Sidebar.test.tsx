import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import Sidebar from "../layouts/authenticated/Sidebar";
import { render, screen, fireEvent } from '@testing-library/react';


describe('Sidebar', () => {
    test('renders sidebar items and highlights active item', () => {
        render(
            <MemoryRouter initialEntries={['/trades']}>
                <Route path="/trades">
                    <Sidebar open={true} handleToggle={() => {}} />
                </Route>
            </MemoryRouter>
        );

        const tradingJournalItem = screen.getByText('Trading Journal');
        const tradesItem = screen.getByText('Trades');

        fireEvent.click(tradesItem);

        expect(tradingJournalItem).toBeInTheDocument();
        expect(tradesItem).toBeInTheDocument();
        expect(tradesItem).toHaveClass('Mui-selected');
    });
});
