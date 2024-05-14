import React from 'react';

const HouseholdSummary = ({ familyMembers }) => {

  const formatValue = (value) => {
    if (value) {
      return `${Math.round(value).toLocaleString()} Ft`;
    } else {
      return "0 Ft";
    }
  };

  const totalNettoBer = familyMembers.reduce((acc, member) => acc + member.nettoBer, 0);

  return (
    <div className='py-[3rem] h-auto bg-slate-600 shadow-2xl text-white w-[95%] sm:w-[80%] lg:w-[50%] rounded-xl flex flex-col items-center'>

      <div className='uppercase font-bold tracking-widest px-10 text-md py-5 text-sm'>Háztartás összesített jövedelme</div>

      <div className='bg-white text-black w-[85%] h-[27rem] p-2 overflow-hidden rounded-lg relative'>
        <div className='flex w-full'>
          <div className='w-[50%] font-bold'>Családtag</div>
          <div className='w-[50%] font-bold'>Nettó bér</div>
        </div>
        <hr/>

        <div className='h-[23rem] overflow-auto'>
          {familyMembers.map((member, index) => (
            <div key={member.id}>
              <div className={(index + 1) % 2 == 0 ? 'flex w-full bg-slate-100' : 'flex w-full bg-white'}>
                <div className='w-[50%]'>{member.name == "" ? "Névtelen" : member.name}</div>
                <div className='w-[50%]'>{formatValue(member.nettoBer)}</div>
              </div>
              <hr/>
            </div>
          ))}
        </div>

        <div className='flex w-full'>
          <div className='font-bold text-orange-600 w-[50%]'>Összesen:</div>
          <div className='font-bold text-orange-600 w-[50%]'>{formatValue(totalNettoBer)}</div>
        </div>

      </div>

    </div>
  );
};

export default HouseholdSummary;
