import React from 'react';

const NettoBer = ({activeMember}) => {
    const formatValue = (value) => {
        if(value){
            return `${Math.round(value).toLocaleString()} Ft`;
        }else{
            return"0 Ft";
        }
        
    };

    return (
        <div className='flex flex-col w-[100%] items-center mt-10'>
            <div>Számított nettó bér:</div>
            <div className='bg-orange-600 p-1 rounded-md'>{formatValue(activeMember.nettoBer)}</div>
        </div>
    );
};

export default NettoBer;
