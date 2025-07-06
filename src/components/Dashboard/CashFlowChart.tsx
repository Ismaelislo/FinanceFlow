import React from 'react';
import { TrendingUp } from 'lucide-react';

export const CashFlowChart: React.FC = () => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
  const incomeData = [25000, 28000, 32000, 29000, 35000, 38000];
  const expenseData = [18000, 22000, 25000, 24000, 28000, 26000];

  const maxValue = Math.max(...incomeData, ...expenseData);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Flux de trésorerie</h3>
          <p className="text-sm text-gray-600">Évolution sur 6 mois</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Recettes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Dépenses</span>
          </div>
        </div>
      </div>

      <div className="relative h-80">
        <div className="absolute inset-0 flex items-end justify-between space-x-2">
          {months.map((month, index) => (
            <div key={month} className="flex-1 flex flex-col items-center space-y-1">
              <div className="w-full flex items-end space-x-1" style={{ height: '240px' }}>
                <div 
                  className="bg-emerald-500 rounded-t-md transition-all duration-500 ease-out hover:bg-emerald-600 cursor-pointer"
                  style={{ 
                    height: `${(incomeData[index] / maxValue) * 100}%`,
                    width: '45%'
                  }}
                  title={`Recettes: €${incomeData[index].toLocaleString()}`}
                />
                <div 
                  className="bg-red-500 rounded-t-md transition-all duration-500 ease-out hover:bg-red-600 cursor-pointer"
                  style={{ 
                    height: `${(expenseData[index] / maxValue) * 100}%`,
                    width: '45%'
                  }}
                  title={`Dépenses: €${expenseData[index].toLocaleString()}`}
                />
              </div>
              <span className="text-xs text-gray-500 font-medium">{month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
        <div className="flex items-center">
          <TrendingUp className="w-5 h-5 text-emerald-600 mr-2" />
          <span className="text-sm text-emerald-800">
            <strong>Tendance positive:</strong> +15% de croissance ce trimestre
          </span>
        </div>
      </div>
    </div>
  );
};