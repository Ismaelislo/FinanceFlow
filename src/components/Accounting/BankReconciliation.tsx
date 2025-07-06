import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Download, Upload, RefreshCw, Eye } from 'lucide-react';

const bankAccounts = [
  {
    id: 1,
    name: 'Compte principal - Banque de Mayotte',
    number: '****1234',
    balance: 28900,
    lastReconciliation: '2024-01-10',
    pendingItems: 5,
    status: 'pending'
  },
  {
    id: 2,
    name: 'Compte épargne - Crédit Agricole',
    number: '****5678',
    balance: 25000,
    lastReconciliation: '2024-01-15',
    pendingItems: 0,
    status: 'reconciled'
  }
];

const bankTransactions = [
  {
    id: 1,
    date: '2024-01-15',
    description: 'Virement reçu - Société XYZ',
    amount: 2850,
    type: 'credit',
    status: 'matched',
    accountingEntry: 'ECR-2024-001'
  },
  {
    id: 2,
    date: '2024-01-14',
    description: 'Prélèvement assurance',
    amount: -485,
    type: 'debit',
    status: 'unmatched',
    accountingEntry: null
  },
  {
    id: 3,
    date: '2024-01-13',
    description: 'Virement interne',
    amount: 1000,
    type: 'credit',
    status: 'pending',
    accountingEntry: null
  },
  {
    id: 4,
    date: '2024-01-12',
    description: 'Paiement fournisseur ABC',
    amount: -1200,
    type: 'debit',
    status: 'matched',
    accountingEntry: 'ECR-2024-002'
  }
];

const unmatchedEntries = [
  {
    id: 1,
    date: '2024-01-14',
    account: '607000',
    description: 'Achat fournitures',
    amount: 485,
    type: 'expense'
  },
  {
    id: 2,
    date: '2024-01-13',
    account: '512000',
    description: 'Virement interne',
    amount: 1000,
    type: 'transfer'
  }
];

export const BankReconciliation: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState(bankAccounts[0]);
  const [showUnmatched, setShowUnmatched] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'unmatched':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'matched':
        return 'Rapproché';
      case 'unmatched':
        return 'Non rapproché';
      case 'pending':
        return 'En attente';
      default:
        return 'Inconnu';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched':
        return 'bg-emerald-100 text-emerald-800';
      case 'unmatched':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rapprochement bancaire</h2>
          <p className="text-gray-600">Rapprochez vos relevés bancaires avec votre comptabilité</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Importer relevé
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Synchroniser
          </button>
        </div>
      </div>

      {/* Sélection du compte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bankAccounts.map((account) => (
          <div 
            key={account.id} 
            className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all ${
              selectedAccount.id === account.id 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedAccount(account)}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{account.name}</h3>
                <p className="text-sm text-gray-600">{account.number}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                account.status === 'reconciled' ? 'bg-emerald-500' : 'bg-orange-500'
              }`} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Solde</span>
                <span className="font-medium">€{account.balance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dernier rapprochement</span>
                <span className="text-sm">{new Date(account.lastReconciliation).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Éléments en attente</span>
                <span className={`text-sm font-medium ${
                  account.pendingItems > 0 ? 'text-orange-600' : 'text-emerald-600'
                }`}>
                  {account.pendingItems}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistiques du rapprochement */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rapprochés</p>
              <p className="text-2xl font-bold text-emerald-600">
                {bankTransactions.filter(t => t.status === 'matched').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Non rapprochés</p>
              <p className="text-2xl font-bold text-red-600">
                {bankTransactions.filter(t => t.status === 'unmatched').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-orange-600">
                {bankTransactions.filter(t => t.status === 'pending').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de rapprochement</p>
              <p className="text-2xl font-bold text-blue-600">75%</p>
            </div>
            <RefreshCw className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Transactions bancaires */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Transactions - {selectedAccount.name}
            </h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowUnmatched(!showUnmatched)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  showUnmatched 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Afficher non rapprochés
              </button>
              <button className="text-blue-600 hover:text-blue-700">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Écriture</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bankTransactions
                .filter(transaction => !showUnmatched || transaction.status === 'unmatched')
                .map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-medium ${
                      transaction.amount >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {transaction.amount >= 0 ? '+' : ''}€{Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.accountingEntry || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {transaction.status === 'unmatched' && (
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Rapprocher
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-700">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Écritures non rapprochées */}
      {showUnmatched && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Écritures comptables non rapprochées</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compte</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {unmatchedEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {entry.account}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      €{entry.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Associer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};