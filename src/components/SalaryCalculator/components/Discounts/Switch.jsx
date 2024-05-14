import React, { useEffect, useState } from 'react';

const Switch = ({ label, data, activeMember, setActiveMember }) => {
  const [value, setValue] = useState(getValueFromActiveMember(activeMember) || false);

  useEffect(() => {
    setValue(getValueFromActiveMember(activeMember) || false);
  }, [activeMember]);

  function getValueFromActiveMember(member) {
    return data === 'SZJAmentes' ? member.SZJAmentes :
          data === 'frissHazas' ? member.frissHazas :
          data === 'szemelyiKedvezmeny' ? member.szemelyiKedvezmeny :
          member.csaladiKedvezmeny;
  }

  const handleCheckboxChange = () => {
    const updatedValue = !value;

    setActiveMember((prevActiveMember) => ({
      ...prevActiveMember,
      [data]: updatedValue,
    }));

    setValue(updatedValue);
  };

  return (
    <label className='py-1 relative inline-flex cursor-pointer select-none items-center'>
      <input type='checkbox' className='sr-only' checked={value} onChange={handleCheckboxChange} />
      <span
        className={`relative slider mr-2 flex h-4 w-7 items-center rounded-full p-1 duration-200 ${
          value ? 'bg-orange-600' : 'bg-slate-800'
        }`}
      >
        <span
          className={`dot h-4 w-4 absolute left-0 rounded-full  duration-200 ${
            value ? ' bg-white translate-x-3' : 'bg-white'
          }`}
        ></span>
      </span>
      <span className='label flex items-center text-sm font-medium text-white'>
        {label} <span className='pl-1'> </span>
      </span>
    </label>
  );
};

export default Switch;
