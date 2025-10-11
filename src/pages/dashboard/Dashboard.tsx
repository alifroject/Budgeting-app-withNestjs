import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Welcome back, {user?.firstName}!
                </h1>
                <p className="text-gray-600 mt-2">
                    Here's your financial overview
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Balance</h3>
                    <p className="text-3xl font-bold text-green-600">$2,500.00</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">This Month</h3>
                    <p className="text-3xl font-bold text-blue-600">$1,200.00</p>
                    <p className="text-sm text-gray-500">Income vs Expenses</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Savings</h3>
                    <p className="text-3xl font-bold text-purple-600">$800.00</p>
                    <p className="text-sm text-gray-500">+15% from last month</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View All
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                        <div>
                            <p className="font-medium text-gray-800">Grocery Store</p>
                            <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                        </div>
                        <p className="text-red-600 font-semibold">-$85.50</p>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b">
                        <div>
                            <p className="font-medium text-gray-800">Salary</p>
                            <p className="text-sm text-gray-500">Yesterday</p>
                        </div>
                        <p className="text-green-600 font-semibold">+$2,500.00</p>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b">
                        <div>
                            <p className="font-medium text-gray-800">Netflix</p>
                            <p className="text-sm text-gray-500">2 days ago</p>
                        </div>
                        <p className="text-red-600 font-semibold">-$15.99</p>
                    </div>
                </div>
            </div>

       
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex space-x-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Add Transaction
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Set Budget
                    </button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        View Reports
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;