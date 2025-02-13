import { useEffect, useRef, useState } from "react";

const DepositInput = ({
    setBalance,
    setNewStatement,
    deposit,
    setDeposit,
    displayDeposit,
    setDisplayDeposit,
}) => {
    const [error, setError] = useState("");
    const depositInputRef = useRef(null);

    useEffect(() => {
        depositInputRef.current?.focus();
    }, []);

    const onDeposit = (e) => {
        const value = e.target.value;
        setDeposit(value);
        if (!e.target.validity.valid || Number(value) === 0) {
            setError("Please enter a valid balance (e.g., 1000 or 1000.50)");
        } else {
            setError("");
        }
    };

    const onKeydown = (e) => {
        if (!deposit || error) return;
        if (e.code === "Enter") {
            onDepositSubmit();
        }
    };

    const onDepositSubmit = () => {
        setBalance((balance) => {
            const newAcc = balance + Number(deposit);
            setNewStatement(deposit, newAcc);
            return newAcc;
        });
        setDisplayDeposit(true);
    };

    return (
        <>
            <div className="deposit-container">
                <label htmlFor="deposit">
                    Please enter the amount to deposit:
                </label>
                <input
                    type="text"
                    id="deposit"
                    title="Enter a valid balance (e.g., 1000 or 1000.50)"
                    placeholder="Enter amount"
                    ref={depositInputRef}
                    value={deposit}
                    onChange={onDeposit}
                    onKeyDown={onKeydown}
                    disabled={displayDeposit}
                    pattern="^\d+(\.\d{1,2})?$"
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                    type="button"
                    onClick={onDepositSubmit}
                    disabled={displayDeposit || !deposit || error}
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default DepositInput;
