import React from 'react';
import { Link } from 'react-router-dom';


interface DahshboardLayout {
    children: React.ReactNode;
}


const DahshboardLayout: React.FC<DahshboardLayout> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            <div className="w-64 bg-white shadow-lg">

            </div>


            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default DahshboardLayout;