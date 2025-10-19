import React from "react";
import { UserBudget } from "./BudgetUser";
import { useTheme } from "../../contexts/ThemeContext";

export default function MainBudget() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

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
            <UserBudget />
          </div>
        </div>
        <div
          className={`w-[30%] rounded-2xl shadow-md p-4 flex flex-col justify-center transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-green-100"
            }`}
        >
          <p className="font-semibold">Right Column (100%)</p>
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
