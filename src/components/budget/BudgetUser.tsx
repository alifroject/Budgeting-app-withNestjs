import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../store/store';
import { getMe } from '../../features/authSlice';
import axios from "axios";


//theme
import { useTheme } from '../../contexts/ThemeContext';



interface BudgetItem {
    id: number;
    title: string;
    category: string;
    limitAmount: number;
}


export const UserBudget: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);

    //get budget
    const [show, setShow] = useState(false)
    const [budget, setBudget] = useState<BudgetItem[]>([])

    //theme
    const { theme } = useTheme();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch])

    // get budget
    useEffect(() => {
        getBudget();
        setTimeout(() => setShow(true), 10);
    }, []);

    const getBudget = async () => {
        try {
            const res = await axios.get("http://localhost:3001/budget", { withCredentials: true });
            setBudget(res.data)
        } catch (err: any) {
            console.error('Error fetching budget', err)
        }
    }

    const deleteUsers = async (budgetId: number | string): Promise<void> => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3001/budget/${budgetId}`, { withCredentials: true });
            setBudget(prev => prev.filter(item => item.id !== budgetId)); //realtime removal
        } catch (error) {
            console.error("Failed to delete budget:", error);
        }
    };




    return (
        <>
            <div className="overflow-x-auto p-4 transition-colors duration-300">
                {budget.length > 0 ? (
                    <table
                        className={`min-w-full rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
                            }`}
                    >
                        <thead
                            className={`${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-blue-100 text-gray-700'
                                }`}
                        >
                            <tr>
                                <th className="text-left py-3 px-6 font-medium">Title</th>
                                <th className="text-left py-3 px-6 font-medium">Category</th>
                                <th className="text-left py-3 px-6 font-medium">Limit Amount</th>
                                <th className="py-3 px-6 font-semibold text-center tracking-wide 
                                                text-blue-600 uppercase border-l border-gray-200
                                                dark:text-blue-400 dark:border-gray-700">
                                    Actions
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {budget.map((item: BudgetItem) => (
                                <tr
                                    key={item.id}
                                    className={`border-b transition-colors duration-200 ${theme === 'dark'
                                        ? 'border-gray-700 hover:bg-gray-700'
                                        : 'border-gray-200 hover:bg-blue-50'
                                        }`}
                                >
                                    <td className="py-3 px-6">{item.title}</td>
                                    <td className="py-3 px-6">{item.category}</td>
                                    <td className="py-3 px-6">
                                        {item.limitAmount.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex justify-center items-center gap-3">
                                            <button
                                                className="px-3 py-1.5 text-sm font-medium rounded-md 
                 bg-blue-500 text-white hover:bg-blue-600 
                 shadow-sm hover:shadow-md transition-all duration-200"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteUsers(item.id)}
                                                className="px-3 py-1.5 text-sm font-medium rounded-md 
                 bg-red-500 text-white hover:bg-red-600 
                 shadow-sm hover:shadow-md transition-all duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p
                        className={`text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                            }`}
                    >
                        No budget data available.
                    </p>
                )}
            </div>

        </>

    )
}