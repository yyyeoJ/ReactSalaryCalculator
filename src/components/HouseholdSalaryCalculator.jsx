import { useState, useEffect } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const HouseholdSalaryCalculator = () => {
  const minimalBer = 266800;
  const SZJA = 0.15;
  const TB = 0.185;

  const [familyMembers, setFamilyMembers] = useLocalStorage(
    "familyMembers",
    [
      {
        id: 1,
        name: "",
        bruttoBer: minimalBer,
        nettoBer: 0,
        SZJAMentes: false,
        frissHazas: false,
        hazasDate: "",
        dateSaved: false,
        jogosult: false,
        szemelyiKedvezmeny: false,
        csaladiKedvezmeny: false,
        eltartott: 0,
        kedvetmenyezett: 0,
      },
    ]
  );

  const addFamilyMember = () => {
    const newMember = {
      id: Date.now() + Math.random(),
      name: "",
      bruttoBer: minimalBer,
      nettoBer: 0,
      SZJAMentes: false,
      frissHazas: false,
      hazasDate: "",
      dateSaved: false,
      jogosult: false,
      szemelyiKedvezmeny: false,
      csaladiKedvezmeny: false,
      eltartott: 0,
      kedvetmenyezett: 0,
    };
    setFamilyMembers([...familyMembers, newMember]);
    setActiveMember(newMember);
  };

  const [activeMember, setActiveMember] = useState(familyMembers[0]);

  const handleActiveMemberChange = (event) => {
    const { name, value } = event.target;
    setActiveMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const updateActiveMember = (member) => {
    setActiveMember(member);
    setFamilyMembers((prevMembers) =>
      prevMembers.map((memberItem) => {
        if (memberItem.id === activeMember.id) {
          return activeMember;
        }
        return memberItem;
      })
    );
  };

  const deleteActiveMember = () => {
    if (familyMembers.length === 1) {
      return;
    }

    const index = familyMembers.findIndex(
      (member) => member.id === activeMember.id
    );

    if (index === 0) {
      setActiveMember(familyMembers[1]);
    } else {
      setActiveMember(familyMembers[index - 1]);
    }

    setFamilyMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== activeMember.id)
    );
  };

  return (
    <div className="w-[100%] sm:w-[80%] mt-10">
      <header>
        <FamilyMemberTabs
          familyMembers={familyMembers}
          setActiveMember={setActiveMember}
          activeMember={activeMember}
          addFamilyMember={addFamilyMember}
        />
      </header>
      <main className="flex flex-col items-center lg:flex-row gap-5 w-[100%] justify-center">
        <SalaryCalculator
          SZJA={SZJA}
          TB={TB}
          minimalBer={minimalBer}
          familyMembers={familyMembers}
          deleteActiveMember={deleteActiveMember}
          setActiveMember={setActiveMember}
          activeMember={activeMember}
          handleActiveMemberChange={handleActiveMemberChange}
          updateActiveMember={updateActiveMember}
        />
        <HouseholdSummary familyMembers={familyMembers} />
      </main>
    </div>
  );
};

export default HouseholdSalaryCalculator;
