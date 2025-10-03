import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Download, ShoppingCart } from 'lucide-react';

const StorePage = () => {
  const navigate = useNavigate();

  const extensions = [
    { name: 'Healthcare', price: '$89', color: 'green' },
    { name: 'Restaurant', price: '$79', color: 'orange' },
    { name: 'Construction', price: '$99', color: 'yellow' },
    { name: 'Enterprise Suite', price: '$199', color: 'purple', premium: true }
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Extensions Store</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {extensions.map((ext) => (
            <div key={ext.name} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{ext.name}</h3>
                  {ext.premium && <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">PREMIUM</span>}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{ext.price}</div>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Install
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/inventory')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorePage;