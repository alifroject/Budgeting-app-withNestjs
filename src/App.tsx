import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="p-6">
        <div className="text-2xl font-bold text-white">BudgetApp</div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-6">
            Simple Budgeting for 
            <span className="text-emerald-400"> Everyone</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Track your income and expenses effortlessly. No complicated spreadsheets, just clear financial insights.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
              Create Account
            </button>
            <button className="border border-slate-600 text-slate-300 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
              Learn More
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 text-slate-400">
            <div>
              <div className="text-2xl font-bold text-white">Free</div>
              <div>Forever</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Secure</div>
              <div>Bank-level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Easy</div>
              <div>5-min setup</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;