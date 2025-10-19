import React, { useEffect, useState } from "react";
import { BudgetItem } from "../../types/budget";
import { Category } from "@mui/icons-material";

interface EditBudgetProps {
    selectedBudget: BudgetItem | null;
}

export const EditBudget: React.FC<EditBudgetProps> = ({ selectedBudget }) => {

    const [form, setForm] = useState({
        title: "",
        category: "",
        limitAmount: "",
        startDate: "",
        endDate: "",
    });
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        if (selectedBudget) {
            setForm({
                title: selectedBudget.title,
                category: selectedBudget.category,
                limitAmount: selectedBudget.limitAmount.toString(),
                startDate: selectedBudget.startDate.split("T")[0],
                endDate: selectedBudget.endDate.split("T")[0],
            })
        } else {
            setForm({ title: "", category: "", limitAmount: "", startDate: "", endDate: "" });
        }
        setFormKey(prev => prev + 1);
    }, [selectedBudget])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleRefresh = () => {
        setForm({ title: "", category: "", limitAmount: "", startDate: "", endDate: "" });
        setFormKey(prev => prev + 1);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Update data", form)
    }

    return (
        <>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-4">Edit Budget</h2>

                {!selectedBudget && <p className="text-gray-500 dark:text-gray-400">Select a budget to edit</p>}

                {selectedBudget && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input
                                name="title"
                                type="text"
                                value={form.title}
                                onChange={handleChange}
                                className="rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <input
                                name="category"
                                type="text"
                                value={form.category}
                                onChange={handleChange}
                                className="rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">Limit Amount</label>
                            <input
                                name="limitAmount"
                                type="number"
                                value={form.limitAmount}
                                onChange={handleChange}
                                className="rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                            <input
                                name="startDate"
                                type="date"
                                value={form.startDate}
                                onChange={handleChange}
                                className="rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">End Date</label>
                            <input
                                name="endDate"
                                type="date"
                                value={form.endDate}
                                onChange={handleChange}
                                className="rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="flex gap-2 mt-2">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-all"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleRefresh}
                                className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-400 transition-all dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                                Refresh
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};
