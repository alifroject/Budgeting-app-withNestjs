import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BudgetItem } from "../../types/budget";
import { Button } from "@mui/material";


interface BudgetHeaderProps {
    children?: React.ReactNode;
    onAdd?: () => void;

}

const BudgetHeader: React.FC<BudgetHeaderProps> = ({ children, onAdd }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-gray-800"
                }`}

        >
            <h2 className="font-bold text-lg">Budget budget  Header</h2>
            {children}
            {onAdd && (
                <button
                    onClick={onAdd}
                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Budget
                </button>
            )}
        </div>
    );
};

export default BudgetHeader;
