const Dropdown = ({ options, onSelect }) => {
    return (
        <select onChange={(e) => onSelect(e.target.value)}>
            <option key={"blank"} value={""}>
                {"---SELECT OPTION----"}
            </option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
