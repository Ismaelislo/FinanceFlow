import React from 'react';
import { CreditCard, Send, ArrowUpRight, ArrowDownRight, Eye, Plus } from 'lucide-react';

const accounts = [
  {
    id: 1,
    name: 'Compte principal',
    bank: 'Banque de Mayotte',
    balance: 12890,
    type: 'Courant',
    currency: 'EUR'
  },
  {
    id: 2,
    name: 'Compte épargne',
    bank: 'Crédit Agricole',
    balance: 25000,
    type: 'Épargne',
    currency: 'EUR'
  }
];

const recentTransactions = [
  {
    id: 1,
    type: 'credit',
    description: 'Virement reçu - Société XYZ',
    amount: 2850,
    date: '2024-01-15',
    account: 'Compte principal'
  },
  {
    id: 2,
    type: 'debit',
    description: 'Prélèvement assurance',
    amount: 485,
    date: '2024-01-14',
    account: 'Compte principal'
  },
  {
    id: 3,
    type: 'credit',
    description: 'Virement interne',
    amount: 1000,
    date: '2024-01-13',
    account: 'Compte épargne'
  }
];

export const BankingDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Comptes bancaires</h2>
          <p className="text-gray-600">Gérez vos comptes et effectuez des virements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Send className="w-4 h-4 mr-2" />
            Virement
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter compte
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-600">{account.bank}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Eye className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Type de compte</span>
                <span className="text-sm font-medium text-gray-900">{account.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Solde disponible</span>
                <span className="text-xl font-bold text-gray-900">
                  €{account.balance.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                  Virement
                </button>
                <button className="flex-1 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Historique
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Transactions récentes</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Voir toutes
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'credit' 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.account}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'credit' 
                      ? 'text-emerald-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}€{transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};