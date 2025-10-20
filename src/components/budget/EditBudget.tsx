import React, { useEffect, useState } from "react";
import { BudgetItem } from "../../types/budget";
import { Category } from "@mui/icons-material";
import { useBudget } from "../../hooks/useBudget";


interface EditBudgetProps {
    selectedBudget: BudgetItem | null;
    setSelectedBudget: (item: BudgetItem | null) => void; 
    onBudgetUpdated: () => void
}

export const EditBudget: React.FC<EditBudgetProps> = ({ selectedBudget,setSelectedBudget, onBudgetUpdated }) => {
    //hooks
    const { editBudget, addBudget } = useBudget();
    const isEdit = selectedBudget !== null;

    const [form, setForm] = useState({
        title: "",
        category: "",
        limitAmount: "",
        startDate: "",
        endDate: "",
    });
    const [formKey, setFormKey] = useState(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
        if (selectedBudget) setSelectedBudget(null);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

    

        const newErrors: { [key: string]: string } = {};

        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.category.trim()) newErrors.category = "Category is required";
        if (!form.limitAmount) newErrors.limitAmount = "Limit Amount is required";
        if (!form.startDate) newErrors.startDate = "Start Date is required";
        if (!form.endDate) newErrors.endDate = "End Date is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const payload = {
            title: form.title.trim(),
            category: form.category.trim(),
            limitAmount: Number(form.limitAmount),
            startDate: form.startDate,
            endDate: form.endDate,
        };

        try {
            if (isEdit) {
                await editBudget(selectedBudget!.id, payload);
            } else {
                await addBudget(payload);
            }

            onBudgetUpdated?.();
            setForm({ title: "", category: "", limitAmount: "", startDate: "", endDate: "" });
            setErrors({});
        } catch (error) {
            console.error("Failed to update budget:", error);
        }
    };


    return (
        <>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-4">Edit Budget</h2>



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
                        {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title}</span>}
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
                        {errors.title && <span className="text-red-500 text-sm mt-1">{errors.category}</span>}
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
                        {errors.title && <span className="text-red-500 text-sm mt-1">{errors.limitAmount}</span>}
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
                        {errors.title && <span className="text-red-500 text-sm mt-1">{errors.startDate}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">End Date</label>
                        <input
                            name="endDate"
                            type="date"
                            value={form.endDate}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                        />{errors.title && <span className="text-red-500 text-sm mt-1">{errors.endDate}</span>}
                    </div>

                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-all">
                            {isEdit ? "Save Changes" : "Add Budget"}
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

            </div>
        </>
    );
};
