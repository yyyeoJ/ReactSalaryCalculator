import React, { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";

const FamilyMemberTabs = ({ familyMembers, setActiveMember, activeMember, addFamilyMember }) => {
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    setForceUpdate((prev) => !prev);
  }, [activeMember]);

  const handleTabClick = (member) => {
    setActiveMember(member);
  };

  const memoizedTabs = useMemo(
    () => (
      <div className="text-white w-[100%] mb-3 h-auto flex flex-wrap justify-center lg:justify-start items-center gap-2">
        <div className="bg-slate-600 shadow-2xl h-auto flex flex-wrap items-center justify-center px-2 py-1 rounded-lg gap-1">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className={
                member.id === activeMember.id
                  ? "bg-white text-black p-1 rounded-lg cursor-pointer"
                  : "bg-slate-600 text-white p-1 rounded-lg cursor-pointer"
              }
              onClick={() => handleTabClick(member)}
            >
              {member.name == "" ? "Névtelen" : member.name}
            </div>
          ))}
        </div>

        <button
          onClick={addFamilyMember}
          className="bg-slate-600 shadow-2xl hover:bg-orange-600 text-3xl flex justify-center items-center font-bold h-10 w-10 rounded-xl"
        >
          <FaPlus />
        </button>
      </div>
    ),
    [activeMember, familyMembers, forceUpdate]
  );

  return memoizedTabs;
};

export default FamilyMemberTabs;
