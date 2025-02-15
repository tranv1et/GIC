import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";
import { beforeEach, describe, test, expect } from "vitest";

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

    test("selects deposit and input valid amount", async () => {
        // Simulate user typing in the input field
        await userEvent.type(input, "500");

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return (
                content.replace(/\s+/g, " ").trim() ===
                "Thank you. $500.00 has been deposited to your account. Is there anything else you'd like to do?"
            );
        });

        expect(paragraph).toBeInTheDocument();
    });

    test("selects deposit and input negative or zero amount", async () => {
        // Simulate typing
        await userEvent.type(input, "0");

        // Assert that the button is disabled
        let button = screen.getByRole("button");
        expect(button).toBeDisabled();

        // Check if the paragraph displays the correct text
        let paragraph = screen.getByText((content, element) => {
            return content
                .replace(/\s+/g, " ")
                .trim()
                .includes(
                    "Please enter a valid balance (e.g., 1000 or 1000.50)"
                );
        });

        expect(paragraph).toBeInTheDocument();

        // Simulate typing
        await userEvent.type(input, "-100");

        // Assert that the button is disabled
        button = screen.getByRole("button");
        expect(button).toBeDisabled();

        // Check if the paragraph displays the correct text
        paragraph = screen.getByText((content, element) => {
            return content
                .replace(/\s+/g, " ")
                .trim()
                .includes(
                    "Please enter a valid balance (e.g., 1000 or 1000.50)"
                );
        });

        expect(paragraph).toBeInTheDocument();
    });

    test("selects deposit and input large amount", async () => {
        // Simulate typing
        await userEvent.type(input, "1000000000");

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return (
                content.replace(/\s+/g, " ").trim() ===
                "Thank you. $1,000,000,000.00 has been deposited to your account. Is there anything else you'd like to do?"
            );
        });

        expect(paragraph).toBeInTheDocument();
    });
});
