import React, { useEffect } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";


const Counter = ({activeMember,updateActiveMember,setActiveMember}) => {

    useEffect(()=>{
        updateActiveMember(activeMember)
    },[activeMember])


    const eltartottPlus = ()=>{
        setActiveMember(prevActiveMember => ({
            ...prevActiveMember,
            eltartott:activeMember.eltartott+1
        }));


    }
    const eltartottMinus = ()=>{
        if(activeMember.eltartott > 0){
            setActiveMember(prevActiveMember => ({
                ...prevActiveMember,
                eltartott:activeMember.eltartott-1
            }));
        }

        if(activeMember.kedvezmenyezett >= activeMember.eltartott && activeMember.eltartott > 0){
            setActiveMember(prevActiveMember => ({
                ...prevActiveMember,
                kedvezmenyezett:activeMember.kedvezmenyezett-1
            }));
        }
        
    }

    const kedvezmenyezettPlus = ()=>{
        if(activeMember.kedvezmenyezett < activeMember.eltartott && activeMember.kedvezmenyezett < 3){
            setActiveMember(prevActiveMember => ({
                ...prevActiveMember,
                kedvezmenyezett:activeMember.kedvezmenyezett+1
            }));
        }
    }
    const kedvezmenyezettMinus = ()=>{
        if(activeMember.kedvezmenyezett > 0){
            setActiveMember(prevActiveMember => ({
                ...prevActiveMember,
                kedvezmenyezett:activeMember.kedvezmenyezett-1
            }));
        }
    }

    


    return (
        <div className={activeMember.csaladiKedvezmeny ? 'flex flex-col gap-2 h-[3rem] opacity-100' : 'h-[3rem] flex felx-row gap-2  opacity-0'}>
            <div className='flex gap-1'>
                <button onClick={eltartottPlus} className='bg-slate-800 hover:bg-orange-600 w-5 flex justify-center items-center text-xs rounded-full'><FaPlus /></button>
                <div className='text-sm'>{activeMember.eltartott}</div>
                <button onClick={eltartottMinus} className='bg-slate-800 hover:bg-orange-600 w-5 flex justify-center items-center text-xs rounded-full'><FaMinus /></button>
                <div className='text-sm font-semibold'>Eltartott</div>
            </div>

            <div className='flex gap-1'>
                <button onClick={kedvezmenyezettPlus} className='bg-slate-800 hover:bg-orange-600 w-5 flex justify-center items-center text-xs rounded-full'><FaPlus /></button>
                <div className='text-sm'>{activeMember.kedvezmenyezett}</div>
                <button onClick={kedvezmenyezettMinus} className='bg-slate-800 hover:bg-orange-600 w-5 flex justify-center items-center text-xs rounded-full'><FaMinus /></button>
                <div className='text-sm font-semibold'>Kedvezményezett</div>
            </div>
            

        </div>
    )
}

export default Counter