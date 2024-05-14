import React, { useEffect, useState } from 'react';

const DateModal = ({ activeMember, updateActiveMember, setActiveMember }) => {
    const [value, setValue] = useState(activeMember.hazasDate);

    useEffect(() => {
        updateActiveMember(activeMember);
    }, [activeMember, activeMember.dateS]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        setActiveMember((prevActiveMember) => ({
            ...prevActiveMember,
            hazasDate: newValue,
        }));
    };

    const saveDate = (e) => {
        let currentDate = new Date();
        let inputDate = new Date(activeMember.hazasDate);
        if (activeMember.hazasDate !== '' && inputDate <= currentDate) {
            setActiveMember((prevActiveMember) => ({
                ...prevActiveMember,
                dateSaved: true,
            }));
        }
    };

    useEffect(() => {
        if (activeMember.frissHazas && !activeMember.dateSaved) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [activeMember]);

    return (
        <div
            className={
                activeMember.frissHazas && !activeMember.dateSaved
                    ? 'opacity-100 bg-[rgba(0,0,0,0.6)] w-screen min-h-screen fixed top-0 left-0 z-10 flex flex-col justify-center items-center'
                    : 'pointer-events-none opacity-0 bg-[rgba(0,0,0,0.6)] w-screen h-screen absolute top-0 left-0 z-0 flex flex-col justify-center items-center'
            }>
            <div className='bg-slate-600 w-[95%] h-auto sm:w-[80%] sm:h-[35%] lg:w-[50%] flex flex-col p-5 rounded-xl relative'>
                <div className='w-[80%]'>
                    A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a házassági életközösség
                    alatt legfeljebb 24 hónapon keresztül jár.
                </div>
                <div className='pt-5 pb-2 font-bold'>Add meg a házasságkötés dátumát:</div>
                <input
                    value={value}
                    onChange={handleChange}
                    className='px-2 w-full sm:w-[38%] rounded-md text-black'
                    type='date'
                />
                <button onClick={saveDate} className='bg-orange-600 hover:bg-red-600 p-2 w-[5rem] rounded-md mt-10'>
                    Mentés
                </button>
            </div>
        </div>
    );
};

export default DateModal;
