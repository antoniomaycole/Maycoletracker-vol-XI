import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, BarChart3, Users, Building2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    { icon: Package, title: 'Inventory', route: '/inventory' },
    { icon: BarChart3, title: 'Analytics', route: '/analytics' },
    { icon: Users, title: 'Customers', route: '/customers' },
    { icon: Building2, title: 'Projects', route: '/projects' }
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Business Dashboard</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <button
                key={module.route}
                onClick={() => navigate(module.route)}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 text-center"
              >
                <IconComponent className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="font-medium text-gray-900">{module.title}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;