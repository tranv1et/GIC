import { Statement } from "./App";

export const formatBalance = (value: string): string => {
    // Remove non-numeric characters except dot
    let numericValue = value.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    numericValue = numericValue.replace(/(\..*)\./g, "$1");

    // Format with commas
    const parts = numericValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
};

export const getTime = () => {
    const now = new Date();

    return now
        .toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        })
        .replace(",", "");
};

export const generateStatement = (amount: string, balance: number): Statement => {
    return {
        datetime: getTime(),
        amount,
        balance,
    };
};