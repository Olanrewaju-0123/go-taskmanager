import React from "react";
import { CheckSquare } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <CheckSquare className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            <p className="text-gray-600">Organize your tasks efficiently</p>
          </div>
        </div>
      </div>
    </header>
  );
};
