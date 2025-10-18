// src/components/budget/UserBudget.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getMe } from "../../features/authSlice";
import { useBudget } from "../../hooks/useBudget";
import { BudgetItem } from "../../types/budget";
import { Table } from "../common/Table";

export const UserBudget: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { budget, deleteBudget } = useBudget();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "limitAmount", label: "Limit Amount" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
  ];

  return (
    <Table<BudgetItem>
      columns={columns}
      data={budget}
      renderActions={(item) => (
        <div className="flex justify-center items-center gap-3">
          <button
            className="px-3 py-1.5 text-sm font-medium rounded-md 
          bg-blue-500 text-white hover:bg-blue-600 
          shadow-sm hover:shadow-md transition-all duration-200"
          >
            Edit
          </button>

          <button
            onClick={() => deleteBudget(item.id)}
            className="px-3 py-1.5 text-sm font-medium rounded-md 
          bg-red-500 text-white hover:bg-red-600 
          shadow-sm hover:shadow-md transition-all duration-200"
          >
            Delete
          </button>
        </div>
      )}
    />
  );
};
