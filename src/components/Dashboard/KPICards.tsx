import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, FileText, AlertCircle } from 'lucide-react';

const kpis = [
  {
    title: 'Chiffre d\'affaires',
    value: '€45,230',
    change: '+12.5%',
    isPositive: true,
    icon: DollarSign,
    color: 'bg-emerald-500'
  },
  {
    title: 'Trésorerie',
    value: '€12,890',
    change: '+8.2%',
    isPositive: true,
    icon: CreditCard,
    color: 'bg-blue-500'
  },
  {
    title: 'Factures impayées',
    value: '€3,450',
    change: '-15.3%',
    isPositive: true,
    icon: FileText,
    color: 'bg-orange-500'
  },
  {
    title: 'Dépenses',
    value: '€8,720',
    change: '+5.7%',
    isPositive: false,
    icon: AlertCircle,
    color: 'bg-red-500'
  }
];

export const KPICards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.isPositive ? TrendingUp : TrendingDown;
        
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <TrendIcon className={`w-4 h-4 ${kpi.isPositive ? 'text-emerald-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-medium ml-1 ${kpi.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">ce mois</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${kpi.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};