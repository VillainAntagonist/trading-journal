import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading component", () => {
    test("renders loading indicator and text", () => {
        render(<Loading />);
        // Verify the loading indicator is rendered
        const circularProgress = screen.getByTestId("loading-indicator");
        expect(circularProgress).toBeInTheDocument();

        // Verify the loading text is rendered
        const loadingText = screen.getByText("Loading...");
        expect(loadingText).toBeInTheDocument();

        // Verify the additional text is rendered
        const additionalText = screen.getByText("It may take a while...");
        expect(additionalText).toBeInTheDocument();
    });
});
