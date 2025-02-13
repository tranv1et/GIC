import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

describe("Withdraw tests", () => {
    let dropdown, input;

    beforeEach(() => {
        render(<App />);
        dropdown = screen.getByRole("combobox");

        // Simulate selecting "Withdraw"
        fireEvent.change(dropdown, { target: { value: "Withdraw" } });

        // Get input field
        input = screen.getByRole("textbox");
    });

    test("selects Withdraw and input 500", () => {
        // Simulate user typing in the input field
        fireEvent.change(input, { target: { value: "500" } });

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return (
                content.replace(/\s+/g, " ").trim() ===
                "Insufficient withdrawal balance of account"
            );
        });

        expect(paragraph).toBeInTheDocument();
    });

    test("selects Withdraw and input invalid amount", async () => {
        // Simulate typing
        await userEvent.type(input, "djskweo");

        // Assert that the button is disabled
        let button = screen.getByRole("button");
        expect(button).toBeDisabled();

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return content
                .replace(/\s+/g, " ")
                .trim()
                .includes(
                    "Please enter a valid balance (e.g., 1000 or 1000.50)"
                );
        });

        expect(paragraph).toBeInTheDocument();
    });
});
