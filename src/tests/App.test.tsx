import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

describe("App tests", () => {
    let dropdown;

    beforeEach(() => {
        render(<App />);
        dropdown = screen.getByRole("combobox");
    });

    test("renders App with text", () => {
        const app = screen.queryAllByText(
            /Welcome to AwesomeGIC Bank! What would you like to do?/i
        );
        expect(app[0]).toBeInTheDocument();
    });

    test("renders dropdown with options", () => {
        const options = ["Deposit", "Withdraw", "Print statement", "Quit"];
        // Check if all options are rendered
        options.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    test("selects an option", () => {
        // Mock function
        const mockHandleSelect = vi.fn();

        // Replace App's handleSelect with mock
        dropdown.onchange = (e) => mockHandleSelect(e.target.value);

        // Simulate selecting "Deposit"
        fireEvent.change(dropdown, { target: { value: "Deposit" } });

        // Assertions
        expect(mockHandleSelect).toHaveBeenCalledTimes(1);
        expect(mockHandleSelect).toHaveBeenCalledWith("Deposit");
    });

    test("selects Quit", () => {
        // Mock function
        const mockHandleSelect = vi.fn();

        // Replace App's handleSelect with mock
        dropdown.onchange = (e) => mockHandleSelect(e.target.value);

        // Simulate selecting "Quit"
        fireEvent.change(dropdown, { target: { value: "Quit" } });

        // Check if the paragraph displays the correct text
        const paragraph = screen.getByText((content, element) => {
            return (
                content.replace(/\s+/g, " ").trim() ===
                "Thank you for banking with AwesomeGIC Bank. Have a nice day!"
            );
        });
        expect(paragraph).toBeInTheDocument();
    });
});
