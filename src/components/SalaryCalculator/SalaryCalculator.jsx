import React, { useState, useEffect } from 'react';
import LabeledTextInput from './components/LabeledTextInput';
import InputValueChanger from './components/InputValueChanger';
import NettoBer from './components/NettoBer';
import Discounts from './components/Discounts/Discounts';
import { FaTrashAlt } from "react-icons/fa";

const SalaryCalculator = ({ familyMembers, activeMember, setActiveMember, updateActiveMember, deleteActiveMember, minimalBer, SZJA, TB }) => {

  useEffect(()=>{
    updateActiveMember(activeMember)
  },[activeMember])

useEffect(() => {
  let adoAlap = activeMember.bruttoBer;
  let kedvezmeny = 0;
  const ado = adoAlap * SZJA + activeMember.bruttoBer * TB;

  if (activeMember.SZJAmentes) {
    if(adoAlap >= 499952){
      kedvezmeny += 499952 * SZJA
    }else{
      kedvezmeny += adoAlap * SZJA
    }
  }

  if (activeMember.szemelyiKedvezmeny) {
    const szemelyAdoKedvezmenyOsszeg = Math.round( (minimalBer/3) / 100 ) * 100;
    kedvezmeny += Math.min(szemelyAdoKedvezmenyOsszeg, ado);
  }

  if (activeMember.csaladiKedvezmeny) {
    const kedvezmenyezettmax3 = Math.min(3, activeMember.kedvezmenyezett);
    switch (kedvezmenyezettmax3) {
      case 1:
        kedvezmeny += 10000 * activeMember.eltartott;
        break;
      case 2:
        kedvezmeny += 20000 * activeMember.eltartott;
        break;
      case 3:
        kedvezmeny += 33000 * activeMember.eltartott;
        break;
    }
  }

  

  let netto = Math.min(activeMember.bruttoBer,(activeMember.bruttoBer - ado + kedvezmeny));
  if(activeMember.frissHazas && activeMember.jogosult){netto += 5000}
  setActiveMember(prevActiveMember => ({
    ...prevActiveMember,
    nettoBer:netto
}));
  


}, [activeMember.id, activeMember.bruttoBer, activeMember.nettoBer, activeMember.SZJAmentes, activeMember.hazasDate, 
    activeMember.szemelyiKedvezmeny, activeMember.csaladiKedvezmeny, activeMember.eltartott, activeMember.kedvezmenyezett]);

useEffect(() => {
  if (activeMember.hazasDate !== '') {
    let inputDate = new Date(activeMember.hazasDate)
    let currentDate = new Date();
    let twoYearsAgoDate = new Date((currentDate.getFullYear() - 2), currentDate.getMonth(), currentDate.getDate())
    
    let nextMonth = inputDate.getMonth() + 1;
    let nextYear = inputDate.getFullYear();
    if (nextMonth === 12) {
      nextMonth = 0;
      nextYear++;
    }

    const validFromDate = new Date(nextYear, nextMonth, 1);
    setActiveMember(prevActiveMember => ({
      ...prevActiveMember,
      jogosult:(inputDate > twoYearsAgoDate) && (currentDate >=  validFromDate)
  }));


  }
}, [activeMember.hazasDate]);

useEffect(() => {
  if (!activeMember.csaladiKedvezmeny) {

    setActiveMember(prevActiveMember => ({
      ...prevActiveMember,
      eltartott:0,
      kedvezmenyezett:0
  }));
  }
}, [activeMember.csaladiKedvezmeny]);

useEffect(() => {
  if (!activeMember.frissHazas) {
    setActiveMember(prevActiveMember => ({
      ...prevActiveMember,
      dateSaved:false,
      hazasDate:''
  }));

  }
}, [activeMember.frissHazas]);





  return (
    <div className='bg-slate-600 shadow-2xl text-white w-[95%] sm:w-[80%] lg:w-[50%] h-auto rounded-xl px-2 py-6 flex flex-col items-center'>
      <div className='relative flex align-center justify-center w-full '>
        <div className='h-auto uppercase font-bold tracking-widest py-2 px-10 text-sm'>{activeMember.name} bérének kiszámítása</div>
        <button onClick={deleteActiveMember} 
        className={familyMembers.length == 1 ? 'opacity-50 pointer-events-none absolute right-0  bg-slate-800 text-xl flex justify-center items-center font-bold w-8 h-8 rounded-xl' : 'absolute right-0  bg-slate-800 hover:bg-orange-600 text-xl flex justify-center items-center font-bold h-8 w-8 rounded-xl'}
        ><FaTrashAlt /></button>
      </div>
      <LabeledTextInput updateActiveMember={updateActiveMember} activeMember={activeMember} setActiveMember={setActiveMember} id={"FamilyMemberName"} labelText={"Családtag neve:"} instruction={"Add meg a családtag nevét!"} placeHolder={"Név"} />
      <LabeledTextInput updateActiveMember={updateActiveMember} activeMember={activeMember} setActiveMember={setActiveMember} number={true} id={"FamilyMemberBrutto"} labelText={"Bruttó bér:"} instruction={"Add meg a bruttó bérét"} placeHolder={"Bruttó bér (Ft)"} />
      <InputValueChanger updateActiveMember={updateActiveMember} activeMember={activeMember} setActiveMember={setActiveMember}/>
      <Discounts activeMember={activeMember} setActiveMember={setActiveMember} updateActiveMember={updateActiveMember}/>
      <NettoBer activeMember={activeMember} />
    </div>
  );
};

export default SalaryCalculator;
