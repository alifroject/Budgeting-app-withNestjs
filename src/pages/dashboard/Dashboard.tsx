import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme(); 

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
      }`}
    >
      <div
        className={`rounded-lg shadow-sm p-6 mb-6 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1
          className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          Welcome back, {user?.firstName}!
        </h1>
        <p
          className={`mt-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Here's your financial overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          {
            title: 'Total Balance',
            value: '$2,500.00',
            color: 'text-green-600',
          },
          {
            title: 'This Month',
            value: '$1,200.00',
            color: 'text-blue-600',
            sub: 'Income vs Expenses',
          },
          {
            title: 'Savings',
            value: '$800.00',
            color: 'text-purple-600',
            sub: '+15% from last month',
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`rounded-lg shadow-sm p-6 transition-colors duration-300 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {item.title}
            </h3>
            <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
            {item.sub && (
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {item.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      <div
        className={`rounded-lg shadow-sm p-6 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}
          >
            Recent Transactions
          </h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {[
            { name: 'Grocery Store', time: 'Today, 10:30 AM', amount: '-$85.50', color: 'text-red-600' },
            { name: 'Salary', time: 'Yesterday', amount: '+$2,500.00', color: 'text-green-600' },
            { name: 'Netflix', time: '2 days ago', amount: '-$15.99', color: 'text-red-600' },
          ].map((t, i) => (
            <div
              key={i}
              className={`flex justify-between items-center py-3 border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div>
                <p
                  className={`font-medium ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}
                >
                  {t.name}
                </p>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {t.time}
                </p>
              </div>
              <p className={`${t.color} font-semibold`}>{t.amount}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`mt-6 rounded-lg shadow-sm p-6 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}
        >
          Quick Actions
        </h2>
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
