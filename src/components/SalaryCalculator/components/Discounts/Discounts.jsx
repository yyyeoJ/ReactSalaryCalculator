import React, { useEffect, useState } from 'react'
import Switch from './Switch'
import Counter from './Counter'
import DateModal from './DateModal'


const Discounts = ({activeMember,setActiveMember,updateActiveMember }) => {

  useEffect(()=>{
    updateActiveMember(activeMember)
  },[activeMember])

  

  const changeDate = ()=>{
    setActiveMember(prevActiveMember => ({
      ...prevActiveMember,
      dateSaved:false
  }));
  }

  return (
    <div className='w-[100%] sm:w-[90%] pt-5 flex flex-col '>
        <div className='text-xs uppercase font-bold tracking-wider'>Kedvezmények</div>

        <Switch 
        label={"25 év alattiak SZJA mentessége"}
        data={"SZJAmentes"}
        activeMember={activeMember}
        updateActiveMember={updateActiveMember}
        setActiveMember={setActiveMember}
        />
        
        <div className='flex flex-col'>

          <Switch 
          label ={"Friss házasok kedvezménye"}
          data={"frissHazas"}
          activeMember={activeMember}
          updateActiveMember={updateActiveMember}
          setActiveMember={setActiveMember}
          />
          <DateModal activeMember={activeMember} updateActiveMember={updateActiveMember} setActiveMember={setActiveMember}/>

          <div className='flex gap-2'>
          
          {/* Jogosult / Nem jogosult */}
          {!activeMember.jogosult && activeMember.dateSaved && <div className='w-24 flex items-center justify-center rounded-full text-xs font-bold p-1 bg-red-600 text-white  '>Nem jogosult</div>}
          {activeMember.jogosult &&activeMember.dateSaved && <div className='w-24 flex items-center justify-center rounded-full text-xs font-bold p-1 bg-emerald-600 text-white  '>Jogosult</div>}

          {activeMember.frissHazas && <button 
          onClick={changeDate} 
          className='opacity-100 bg-slate-800 hover:bg-orange-600 rounded-full text-xs p-1 text-white font-bold' >Dátum módosítása
          </button>}

          </div>

          
          


        </div>


        
        <Switch 
        label={"Személyi adókedvezmény"}
        data={"szemelyiKedvezmeny"}
        activeMember={activeMember}
        updateActiveMember={updateActiveMember}
        setActiveMember={setActiveMember}
        
        />

        <Switch 
        label={"Családi kedvezmény"}
        data={"csaladiKedvezmeny"}
        activeMember={activeMember}
        updateActiveMember={updateActiveMember}
        setActiveMember={setActiveMember}
        
        />
        <Counter 
        activeMember={activeMember}
        updateActiveMember={updateActiveMember}
        setActiveMember={setActiveMember}
        />

    </div>
  )
}

export default Discounts