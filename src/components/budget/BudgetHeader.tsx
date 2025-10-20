import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BudgetItem } from "../../types/budget";


const BudgetHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-gray-800"
                }`}

        >
            <h2 className="font-bold text-lg">Budget Header</h2>
            {children}

        </div>
    );
};

export default BudgetHeader;
