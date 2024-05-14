import React, { useEffect, useState } from 'react';

const InputValueChanger = ({ updateActiveMember, activeMember, setActiveMember }) => {


    const [value, setValue] = useState(activeMember.bruttoBer);

    useEffect(()=>{
        updateActiveMember(activeMember)
        setValue(activeMember.bruttoBer)
    },[activeMember])


    const handleSliderChange = (event) => {
        const newValue = parseInt(event.target.value);
        setActiveMember(prevActiveMember => ({
            ...prevActiveMember,
            bruttoBer: newValue
        }));
        
    };

    const handleClick = (percentage) => {
        const newValue = Math.round(value * (1 + percentage / 100));
        setActiveMember(prevActiveMember => ({
            ...prevActiveMember,
            bruttoBer: newValue
        }));
    };

    return (
        <>
            <input className='w-[100%] sm:w-[90%] range-slider' type="range" min="0" max="2000000" step="10000" value={value} onChange={handleSliderChange} />
            <div className='flex justify-center gap-8 w-[90%] pt-3'>
                <button onClick={() => handleClick(-1)} className='bg-orange-600 hover:bg-red-600 w-10 h-10 rounded-md'>-1%</button>
                <button onClick={() => handleClick(-5)} className='bg-orange-600 hover:bg-red-600 w-10 h-10 rounded-md'>-5%</button>
                <button onClick={() => handleClick(1)} className='bg-orange-600 hover:bg-red-600 w-10 h-10 rounded-md'>+1%</button>
                <button onClick={() => handleClick(5)} className='bg-orange-600 hover:bg-red-600 w-10 h-10 rounded-md'>+5%</button>
            </div>
        </>
    );
};

export default InputValueChanger;
