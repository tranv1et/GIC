import { useState } from "react";
import "./App.css";
import Dropdown from "./components/DropDown";
import DepositInput from "./components/DepositInput";
import WithdrawInput from "./components/WithdrawInput";
import { generateStatement, getTime, formatBalance } from "./utils";

enum TYPE {
    D = "Deposit",
    W = "Withdraw",
    P = "Print statement",
    Q = "Quit",
}

export type Statement = {
    datetime: string;
    amount: string;
    balance: number;
};

export const options = [TYPE.D, TYPE.W, TYPE.P, TYPE.Q];

function App() {
    const [type, setType] = useState("");
    const [withdraw, setWithdraw] = useState("");
    const [deposit, setDeposit] = useState("");
    const [displayDeposit, setDisplayDeposit] = useState(false);
    const [displayWithdraw, setDisplayWithdraw] = useState(false);
    const [balance, setBalance] = useState(0);
    const [statement, setStatement] = useState([]);

    const onSelect = (value: string) => {
        setType(value);
        // reset input
        setDeposit("");
        setWithdraw("");
        setDisplayDeposit(false);
        setDisplayWithdraw(false);
    };

    const setNewStatement = (amount: string, balance: number): Statement => {
        const item = generateStatement(amount, balance);
        const newStatement = [...statement];
        newStatement.push(item);
        setStatement(newStatement);
        return {
            datetime: getTime(),
            amount,
            balance,
        };
    };

    const renderContent = (type: string) => {
        switch (type) {
            case TYPE.D:
                return (
                    <DepositInput
                        setBalance={setBalance}
                        setNewStatement={setNewStatement}
                        deposit={deposit}
                        setDeposit={setDeposit}
                        displayDeposit={displayDeposit}
                        setDisplayDeposit={setDisplayDeposit}
                    ></DepositInput>
                );
            case TYPE.W:
                return (
                    <WithdrawInput
                        balance={balance}
                        setBalance={setBalance}
                        setNewStatement={setNewStatement}
                        withdraw={withdraw}
                        setWithdraw={setWithdraw}
                        displayWithdraw={displayWithdraw}
                        setDisplayWithdraw={setDisplayWithdraw}
                    ></WithdrawInput>
                );
            case TYPE.P:
                return <p></p>;
            case TYPE.Q:
                return <p></p>;
        }
    };

    const renderContent2 = (type: string) => {
        switch (type) {
            case TYPE.D:
                return (
                    <>
                        <div className={!displayDeposit ? "hidden" : ""}>
                            Thank you. $
                            {formatBalance(Number(deposit).toFixed(2))} has been
                            deposited to your account. Is there anything else
                            you'd like to do?
                        </div>
                    </>
                );
            case TYPE.W:
                return (
                    <>
                        <div className={!displayWithdraw ? "hidden" : ""}>
                            Thank you. $
                            {formatBalance(Number(withdraw).toFixed(2))} has
                            been withdrawn. Is there anything else you'd like to
                            do?
                        </div>
                    </>
                );
            case TYPE.P:
                return (
                    <>
                        <div>Date | Amount | Balance </div>
                        {statement.map((obj: Statement) => {
                            const { datetime, amount, balance } = obj;
                            const formatAmt = formatBalance(
                                Number(amount).toFixed(2)
                            );
                            return (
                                <>
                                    <div>
                                        {datetime} |{" "}
                                        {Number(amount) < 0
                                            ? `-${formatAmt}`
                                            : formatAmt}{" "}
                                        | {formatBalance(balance.toFixed(2))}
                                    </div>
                                </>
                            );
                        })}
                    </>
                );
            case TYPE.Q:
                return (
                    <div>
                        Thank you for banking with AwesomeGIC Bank. Have a nice
                        day!
                    </div>
                );
        }
    };

    return (
        <>
            <h2>Welcome to AwesomeGIC Bank! What would you like to do?</h2>
            <div className="container">
                <div className="section">
                    <Dropdown options={options} onSelect={onSelect} />
                    {renderContent(type)}
                </div>

                <div className="section-2">{renderContent2(type)}</div>
            </div>
        </>
    );
}

export default App;
