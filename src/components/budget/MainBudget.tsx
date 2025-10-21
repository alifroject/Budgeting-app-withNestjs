import React, { useState, useEffect } from "react";
import { UserBudget } from "./BudgetUser";
import { useTheme } from "../../contexts/ThemeContext";
import { EditBudget } from "./EditBudget";
import { BudgetItem } from "../../types/budget";
import BudgetHeader from "./BudgetHeader";

export default function MainBudget() {
  const { theme } = useTheme();
  const [refreshKey, setRefreshKey] = useState(0);

  const isDark = theme === "dark";
  const [selectedBudget, setSelectedBudget] = useState<BudgetItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleBudgetUpdated = () => {
    setRefreshKey(prev => prev + 1);
    if (isMobile) setSelectedBudget(null);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 968);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`w-full min-h-screen flex flex-col gap-6 p-6 transition-colors duration-300 ${isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
        }`}
    >
      <div className={`flex flex-col md:flex-row gap-6 flex-1`}>
        <div className="flex-1 flex flex-col gap-6">
          <BudgetHeader
            onAdd={isMobile ? () => setSelectedBudget({} as BudgetItem) : undefined}
          />



          <div className="w-full min-w-0 overflow-x-auto max-h-[500px] rounded-2xl shadow-md">
            <div className="min-w-[650px]">
              <UserBudget
                key={refreshKey}
                onEdit={(item) => setSelectedBudget({ ...item })}
              />
            </div>
          </div>


        </div>

        {!isMobile && (
          <div
            className={`flex-1 rounded-2xl shadow-md p-6 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-white-100"
              }`}
          >
            <EditBudget
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
              onBudgetUpdated={handleBudgetUpdated}
            />
          </div>
        )}
      </div>

      <div
        className={`w-full rounded-2xl shadow-md p-6 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-yellow-100"
          }`}
      >
        <p className="font-semibold text-lg">Bottom Full-Width Row</p>
      </div>

      {isMobile && selectedBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setSelectedBudget(null)}
            >
              ✕
            </button>
            <EditBudget
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
              onBudgetUpdated={handleBudgetUpdated}
            />
          </div>
        </div>
      )}

    </div>
  );
}
