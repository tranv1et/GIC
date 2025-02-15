import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { beforeEach, describe, test, expect } from "vitest";

describe("Statement tests", () => {
    let dropdown, input;

    beforeEach(() => {
        render(<App />);
        dropdown = screen.getByRole("combobox");
    });

    test("selects Print Statement", () => {
        // Simulate selecting "Print statement"
        fireEvent.change(dropdown, { target: { value: "Print statement" } });

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return content
                .replace(/\s+/g, " ")
                .trim()
                .includes("Date | Amount | Balance");
        });

        expect(paragraph).toBeInTheDocument();
    });

    test("deposit 500 then check Statement", () => {
        // Simulate selecting "Deposit"
        fireEvent.change(dropdown, { target: { value: "Deposit" } });

        // Get input field
        input = screen.getByRole("textbox");

        // Simulate user typing in the input field
        fireEvent.change(input, { target: { value: "500" } });

        // Simulate user click
        let button = screen.getByRole("button");
        fireEvent.click(button);

        // Simulate selecting "Print statement"
        fireEvent.change(dropdown, { target: { value: "Print statement" } });

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return content
                .replace(/\s+/g, " ")
                .trim()
                .includes("500.00 | 500.00");
        });

        expect(paragraph).toBeInTheDocument();
    });

    test("deposit 500 and withdraw 200 then check Statement", () => {
        // Simulate selecting "Deposit"
        fireEvent.change(dropdown, { target: { value: "Deposit" } });

        // Get input field
        input = screen.getByRole("textbox");

        // Simulate user typing in the input field
        fireEvent.change(input, { target: { value: "500" } });

        // Simulate user click
        let button = screen.getByRole("button");
        fireEvent.click(button);

        // Simulate selecting "Withdraw"
        fireEvent.change(dropdown, { target: { value: "Withdraw" } });

        // Get input field
        input = screen.getByRole("textbox");

        // Simulate user typing in the input field
        fireEvent.change(input, { target: { value: "200" } });

        // Simulate user click
        button = screen.getByRole("button");
        fireEvent.click(button);

        // Simulate selecting "Print statement"
        fireEvent.change(dropdown, { target: { value: "Print statement" } });

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return content
                .replace(/\s+/g, " ")
                .trim()
                .includes("-200.00 | 300.00");
        });

        expect(paragraph).toBeInTheDocument();
    });
});
