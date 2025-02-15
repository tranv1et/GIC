import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";
import { beforeEach, describe, test, expect, vi } from "vitest";

const setup = (initialBalance) => {
    let dropdown, input;
    render(<App />);
    dropdown = screen.getByRole("combobox");

    // Simulate selecting "Deposit"
    fireEvent.change(dropdown, { target: { value: "Deposit" } });

    // Get input field
    input = screen.getByRole("textbox");

    // Deposit amount to simulate initialBalance
    fireEvent.change(input, { target: { value: initialBalance } });
};

describe("Withdraw tests", () => {
    let dropdown, input;

    beforeEach(() => {
        // Setup initial balance for each test case as 500
        setup(500);
        dropdown = screen.getByRole("combobox");

        // Simulate selecting "Withdraw"
        fireEvent.change(dropdown, { target: { value: "Withdraw" } });

        // Get input field
        input = screen.getByRole("textbox");
    });

    test("selects Withdraw and input valid amount", () => {
        // Simulate user typing in the input field
        fireEvent.change(input, { target: { value: "100" } });

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return (
                content.replace(/\s+/g, " ").trim() ===
                "Thank you. $100.00 has been withdrawn. Is there anything else you'd like to do?"
            );
        });

        expect(paragraph).toBeInTheDocument();
    });

    test("selects Withdraw and input more than available balance", () => {
        // Simulate user typing in the input field
        fireEvent.change(input, { target: { value: "600" } });

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
        await userEvent.type(input, "hd#@482");

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
