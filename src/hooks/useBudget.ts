import { useState, useEffect } from "react";
import axios from "axios";
import { BudgetItem } from "../types/budget";

export const useBudget = () => {
  const [budget, setBudget] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getBudget = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/budget", { withCredentials: true });
      setBudget(res.data);
    } catch (err) {
      console.error("Error fetching budget:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBudget = async (budgetId: number | string): Promise<void> => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/budget/${budgetId}`, { withCredentials: true });
      setBudget((prev) => prev.filter((item) => item.id !== budgetId)); // realtime removal
    } catch (error) {
      console.error("Failed to delete budget:", error);
    }
  };

  useEffect(() => {
    getBudget();
  }, []);

  return { budget, loading, deleteBudget, getBudget };
};
