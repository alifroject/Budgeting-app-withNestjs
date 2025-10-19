import React, {useState} from "react";
import { UserBudget } from "./BudgetUser";
import { useTheme } from "../../contexts/ThemeContext";
import { EditBudget } from "./EditBudget";
import { BudgetItem } from "../../types/budget";

export default function MainBudget() {
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const [selectedBudget, setSelectedBudget] = useState<BudgetItem | null>(null);


  return (
    <div
      className={`w-full h-screen flex flex-col gap-6 p-6 transition-colors duration-300 ${isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
        }`}
    >

      <div className="flex flex-1 gap-6">
        <div className="w-[70%] flex flex-col gap-6">

          <div
            className={`flex-[2] rounded-2xl shadow-md p-4 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-blue-100"
              }`}
          >
            <p className="font-semibold">Card 1 (20%)</p>
          </div>


          <div className="flex-[8] w-full h-full min-w-0 overflow-x-hidden overflow-y-hidden">
            <UserBudget onEdit={setSelectedBudget} />
          </div>
        </div>
        <div
          className={`w-[30%] rounded-2xl shadow-md p-4 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-white-100"
            }`}
        >
          <EditBudget selectedBudget={selectedBudget} />
        </div>
      </div>
      <div
        className={`w-full flex-[0.5] rounded-2xl shadow-md p-4 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-yellow-100"
          }`}
      >
        <p className="font-semibold">Bottom Full-Width Row</p>
      </div>
    </div>
  );
}
