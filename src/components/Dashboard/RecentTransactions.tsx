import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'income',
    description: 'Paiement facture #INV-2024-001',
    amount: 2850,
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: 2,
    type: 'expense',
    description: 'Achat fournitures bureau',
    amount: 485,
    date: '2024-01-14',
    status: 'completed'
  },
  {
    id: 3,
    type: 'income',
    description: 'Paiement facture #INV-2024-002',
    amount: 1200,
    date: '2024-01-13',
    status: 'pending'
  },
  {
    id: 4,
    type: 'expense',
    description: 'Abonnement logiciel',
    amount: 99,
    date: '2024-01-12',
    status: 'completed'
  },
  {
    id: 5,
    type: 'income',
    description: 'Conseil client ABC',
    amount: 3500,
    date: '2024-01-11',
    status: 'completed'
  }
];

export const RecentTransactions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Transactions récentes</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Voir tout
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                transaction.type === 'income' 
                  ? 'bg-emerald-100 text-emerald-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="w-5 h-5" />
                ) : (
                  <ArrowDownRight className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' 
                  ? 'text-emerald-600' 
                  : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toLocaleString()}
              </p>
              <div className="flex items-center justify-end mt-1">
                {transaction.status === 'pending' && (
                  <>
                    <Clock className="w-3 h-3 text-orange-500 mr-1" />
                    <span className="text-xs text-orange-600">En attente</span>
                  </>
                )}
                {transaction.status === 'completed' && (
                  <span className="text-xs text-gray-500">Terminé</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};