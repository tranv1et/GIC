import { useRef, useEffect, useState } from "react";

const WithdrawInput = ({
    balance,
    setBalance,
    setNewStatement,
    withdraw,
    setWithdraw,
    displayWithdraw,
    setDisplayWithdraw,
}) => {
    const [error, setError] = useState("");
    const withdrawInputRef = useRef(null);

    useEffect(() => {
        withdrawInputRef.current?.focus();
    }, []);

    const onWithdraw = (e) => {
        const value = e.target.value;
        setWithdraw(value);
        if (!e.target.validity.valid || Number(value) === 0) {
            setError("Please enter a valid balance (e.g., 1000 or 1000.50)");
        } else if (Number(value) > balance) {
            setError("Insufficient withdrawal balance of account");
        } else {
            setError("");
        }
    };

    const onKeydown = (e) => {
        if (!withdraw || error) return;
        if (e.code === "Enter") {
            onWithdrawSubmit();
        }
    };

    const onWithdrawSubmit = () => {
        setBalance((balance) => {
            const newAcc = balance - Number(withdraw);
            setNewStatement(`-${withdraw}`, newAcc);
            return newAcc;
        });
        setDisplayWithdraw(true);
    };

    return (
        <>
            <div className="deposit-container">
                <label htmlFor="withdraw">
                    Please enter the amount to withdraw:
                </label>
                <input
                    type="text"
                    id="withdraw"
                    title="Enter a valid balance (e.g., 1000 or 1000.50)"
                    ref={withdrawInputRef}
                    value={withdraw}
                    placeholder="Enter amount"
                    onChange={onWithdraw}
                    onKeyDown={onKeydown}
                    disabled={displayWithdraw}
                    pattern="^\d+(\.\d{1,2})?$"
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                    type="button"
                    onClick={onWithdrawSubmit}
                    disabled={displayWithdraw || !withdraw || error}
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default WithdrawInput;
