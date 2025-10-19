import { useState, useEffect } from "react";
import axios from "axios";
import { BudgetItem } from "../types/budget";
import { promises } from "dns";

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


  const editBudget = async (budgetId: number | string, updatedData: Partial<BudgetItem>): Promise<void> => {
    const confirmEdit = window.confirm("Are you sure you want to change this data?");
    if (!confirmEdit) return;

    try {
      console.log('Sending PATCH request with:', updatedData);

      const res = await axios.patch(`http://localhost:3001/budget/${budgetId}`, updatedData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setBudget((prev) =>
        prev.map((item) => (item.id === budgetId ? res.data : item))
      );

      console.log('Budget updated successfully:', res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to update budget - Full error details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data, // This will show Zod validation errors
          message: error.message,
          url: error.config?.url,
          method: error.config?.method
        });

        // Show the actual backend validation errors
        const backendError = error.response?.data;
        if (backendError) {
          console.log("Backend validation errors:", JSON.stringify(backendError, null, 2));
        }

        alert(`Failed to update budget: ${backendError?.message || backendError?.error || error.message}`);
      } else {
        console.error("Failed to update budget:", error);
        alert("Failed to update budget. Please try again.");
      }
      throw error;
    }
  };

  const deleteBudget = async (budgetId: number | string): Promise<void> => {
    const confirmDelete = window.confirm("Are you sure you want to delete this data?");
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

  return { budget, loading, deleteBudget, getBudget, editBudget };
};
