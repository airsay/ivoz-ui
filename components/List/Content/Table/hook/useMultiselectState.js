import { useState } from 'react';
const useMultiselectState = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (value === true) {
            const newValues = [...selectedValues, name];
            setSelectedValues(newValues);
        }
        else {
            const newValues = selectedValues.filter((val) => val !== name);
            setSelectedValues(newValues);
        }
    };
    return [selectedValues, handleChange, setSelectedValues];
};
export default useMultiselectState;
