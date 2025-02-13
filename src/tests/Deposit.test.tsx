import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

describe("Deposit tests", () => {
    let dropdown, input;

    beforeEach(() => {
        render(<App />);
        dropdown = screen.getByRole("combobox");

        // Simulate selecting "Deposit"
        fireEvent.change(dropdown, { target: { value: "Deposit" } });

        // Get input field
        input = screen.getByRole("textbox");
    });

    test("selects deposit and input 500", () => {
        // Simulate user typing in the input field
        fireEvent.change(input, { target: { value: "500" } });

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return (
                content.replace(/\s+/g, " ").trim() ===
                "Thank you. $500.00 has been deposited to your account. Is there anything else you'd like to do?"
            );
        });

        expect(paragraph).toBeInTheDocument();
    });

    test("selects deposit and input invalid amount", async () => {
        // Simulate typing
        await userEvent.type(input, "-100");

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
