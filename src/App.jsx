import HouseholdSalaryCalculator from "./components/HouseholdSalaryCalculator";

function App() {


  return (

    <div className='pb-5 h-auto min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-800 to-slate-700'>
      <h1 className='text-center pt-5 text-2xl font-bold text-white'>Bérkalkulátor alkalmazás</h1>
      <HouseholdSalaryCalculator />
    </div>
    
  );
}

export default App;
