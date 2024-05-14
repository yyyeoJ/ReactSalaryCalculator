import React, { useEffect, useState } from 'react';

const LabeledTextInput = ({ number, id, labelText, placeHolder, instruction, activeMember, setActiveMember, updateActiveMember }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(number ? activeMember.bruttoBer : activeMember.name);

    useEffect(() => {
        updateActiveMember(activeMember);
        setValue(number ? activeMember.bruttoBer : activeMember.name);
    }, [activeMember.bruttoBer, activeMember.name]);

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };

    const formatValue = (value) => {
        if (number) {
            if (isFocused) {
                return value;
            } else {
                return `${parseInt(value).toLocaleString()} Ft`;
            }
        } else {
            return value;
        }
    };

    const handleChange = (event) => {
        let value = event.target.value;

        if (!number && value.length > 29) {
            value = value.slice(0, 29);
        }

        if (number) {
            if (value === "") {
                value = "0";
            }
            if (value.length > 1 && value[0] === '0') {
                value = value.slice(1);
            }
            value = value.replace(/[^0-9]/g, '');
            setActiveMember(prevActiveMember => ({
                ...prevActiveMember,
                bruttoBer: value
            }));
        } else {
            setActiveMember(prevActiveMember => ({
                ...prevActiveMember,
                name: value
            }));
        }

        setValue(value);
    };

    return (
        <div className='flex flex-col py-2 w-[100%] sm:w-[90%] items-center'>
            <label className='text-xs self-start' htmlFor={id}>{labelText}</label>
            {number
                ? <input name="bruttoBer" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={formatValue(value)} placeholder={placeHolder} className='w-[100%] px-1 rounded-md text-black' id={id} type="text" />
                : <input name="name" onChange={handleChange} value={value} maxLength={number ? undefined : 29} placeholder={placeHolder} className='w-[100%] px-1 rounded-md text-black' id={id} type="text" />}
            <div className='text-xs opacity-50 self-start'>{instruction}</div>
        </div>
    );
};

export default LabeledTextInput;
