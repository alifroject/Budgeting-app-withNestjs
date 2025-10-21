import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getMe } from "../../features/authSlice";
import { useBudget } from "../../hooks/useBudget";
import { BudgetItem } from "../../types/budget";
import { Table } from "../common/Table";

interface UserBudgetProps {
  onEdit?: (item: BudgetItem) => void
}

export const UserBudget: React.FC<UserBudgetProps> = ({ onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { budget, deleteBudget } = useBudget();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const columns = [
    { key: "name", label: "name" },
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
        <div className="flex flex-col sm:flex-row p-2 justify-center items-center gap-2 w-full">
          <button
            onClick={() => onEdit && onEdit(item)}
            className="flex-1 px-2 py-1 text-xs font-medium rounded-md 
      bg-blue-500 text-white hover:bg-blue-600 
      shadow-sm hover:shadow-md transition-all duration-200"
          >
            Edit
          </button>

          <button
            onClick={() => deleteBudget(item.id)}
            className="flex-1 px-2 py-1 text-xs font-medium rounded-md 
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
