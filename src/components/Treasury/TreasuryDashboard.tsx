import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, AlertTriangle, Calendar, Download, RefreshCw } from 'lucide-react';

const accounts = [
  {
    id: 1,
    name: 'Compte principal - Banque de Mayotte',
    number: '****1234',
    balance: 28900,
    currency: 'EUR',
    type: 'Courant',
    lastSync: '2024-01-15T10:30:00'
  },
  {
    id: 2,
    name: 'Compte épargne - Crédit Agricole',
    number: '****5678',
    balance: 25000,
    currency: 'EUR',
    type: 'Épargne',
    lastSync: '2024-01-15T10:25:00'
  },
  {
    id: 3,
    name: 'Compte USD - BNP Paribas',
    number: '****9012',
    balance: 5200,
    currency: 'USD',
    type: 'Devise',
    lastSync: '2024-01-15T10:20:00'
  }
];

const cashFlowData = [
  { date: '2024-01-01', inflow: 15000, outflow: 8000, balance: 35000 },
  { date: '2024-01-08', inflow: 12000, outflow: 10000, balance: 37000 },
  { date: '2024-01-15', inflow: 18000, outflow: 9500, balance: 45500 },
  { date: '2024-01-22', inflow: 8000, outflow: 12000, balance: 41500 },
  { date: '2024-01-29', inflow: 22000, outflow: 11000, balance: 52500 }
];

const upcomingTransactions = [
  {
    id: 1,
    type: 'inflow',
    description: 'Paiement facture INV-2024-001',
    amount: 2850,
    date: '2024-01-18',
    probability: 'high',
    client: 'Société XYZ'
  },
  {
    id: 2,
    type: 'outflow',
    description: 'Salaires équipe',
    amount: 8500,
    date: '2024-01-31',
    probability: 'confirmed',
    client: 'Paie'
  },
  {
    id: 3,
    type: 'outflow',
    description: 'Loyer bureau',
    amount: 1200,
    date: '2024-02-01',
    probability: 'confirmed',
    client: 'Propriétaire'
  },
  {
    id: 4,
    type: 'inflow',
    description: 'Paiement facture INV-2024-003',
    amount: 3500,
    date: '2024-02-05',
    probability: 'medium',
    client: 'Entreprise DEF'
  }
];

const alerts = [
  {
    id: 1,
    type: 'warning',
    message: 'Solde faible prévu dans 15 jours',
    amount: 2500,
    date: '2024-02-01'
  },
  {
    id: 2,
    type: 'info',
    message: 'Gros encaissement attendu',
    amount: 15000,
    date: '2024-01-25'
  }
];

export const TreasuryDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [forecastPeriod, setForecastPeriod] = useState('3months');

  const totalBalance = accounts.reduce((sum, account) => {
    if (account.currency === 'EUR') return sum + account.balance;
    if (account.currency === 'USD') return sum + (account.balance * 0.92); // Taux de change approximatif
    return sum;
  }, 0);

  const monthlyInflow = cashFlowData.reduce((sum, data) => sum + data.inflow, 0);
  const monthlyOutflow = cashFlowData.reduce((sum, data) => sum + data.outflow, 0);
  const netCashFlow = monthlyInflow - monthlyOutflow;

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800';
      case 'high':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityText = (probability: string) => {
    switch (probability) {
      case 'confirmed':
        return 'Confirmé';
      case 'high':
        return 'Probable';
      case 'medium':
        return 'Incertain';
      case 'low':
        return 'Peu probable';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trésorerie</h2>
          <p className="text-gray-600">Suivi en temps réel et prévisions de trésorerie</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Synchroniser
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* Alertes de trésorerie */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`rounded-lg p-4 ${
              alert.type === 'warning' ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-center">
                <AlertTriangle className={`w-5 h-5 mr-3 ${
                  alert.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                }`} />
                <div>
                  <h3 className={`text-sm font-medium ${
                    alert.type === 'warning' ? 'text-orange-800' : 'text-blue-800'
                  }`}>
                    {alert.message}
                  </h3>
                  <p className={`text-sm ${
                    alert.type === 'warning' ? 'text-orange-700' : 'text-blue-700'
                  }`}>
                    Montant: €{alert.amount.toLocaleString()} - {new Date(alert.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Métriques de trésorerie */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trésorerie totale</p>
              <p className="text-2xl font-bold text-gray-900">€{totalBalance.toLocaleString()}</p>
              <p className="text-sm text-emerald-600">+8.2% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Encaissements</p>
              <p className="text-2xl font-bold text-emerald-600">€{monthlyInflow.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Ce mois</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Décaissements</p>
              <p className="text-2xl font-bold text-red-600">€{monthlyOutflow.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Ce mois</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Flux net</p>
              <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {netCashFlow >= 0 ? '+' : ''}€{netCashFlow.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Ce mois</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              netCashFlow >= 0 ? 'bg-emerald-100' : 'bg-red-100'
            }`}>
              <CreditCard className={`w-6 h-6 ${netCashFlow >= 0 ? 'text-emerald-600' : 'text-red-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Comptes bancaires */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Comptes bancaires</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {accounts.map((account) => (
            <div key={account.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{account.name}</h4>
                    <p className="text-sm text-gray-600">{account.number}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Solde</span>
                  <span className="font-medium text-gray-900">
                    {account.currency === 'EUR' ? '€' : '$'}{account.balance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Type</span>
                  <span className="text-sm text-gray-900">{account.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dernière sync</span>
                  <span className="text-sm text-gray-500">
                    {new Date(account.lastSync).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Graphique de flux de trésorerie */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Évolution de la trésorerie</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Encaissements</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Décaissements</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Solde</span>
              </div>
            </div>
          </div>

          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between space-x-2">
              {cashFlowData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                  <div className="w-full flex items-end space-x-1" style={{ height: '200px' }}>
                    <div 
                      className="bg-emerald-500 rounded-t-md transition-all duration-500 ease-out hover:bg-emerald-600 cursor-pointer"
                      style={{ 
                        height: `${(data.inflow / 25000) * 100}%`,
                        width: '30%'
                      }}
                      title={`Encaissements: €${data.inflow.toLocaleString()}`}
                    />
                    <div 
                      className="bg-red-500 rounded-t-md transition-all duration-500 ease-out hover:bg-red-600 cursor-pointer"
                      style={{ 
                        height: `${(data.outflow / 25000) * 100}%`,
                        width: '30%'
                      }}
                      title={`Décaissements: €${data.outflow.toLocaleString()}`}
                    />
                    <div 
                      className="bg-blue-500 rounded-t-md transition-all duration-500 ease-out hover:bg-blue-600 cursor-pointer"
                      style={{ 
                        height: `${(data.balance / 60000) * 100}%`,
                        width: '30%'
                      }}
                      title={`Solde: €${data.balance.toLocaleString()}`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {new Date(data.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prévisions de trésorerie */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Prévisions de trésorerie</h3>
            <select
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1month">1 mois</option>
              <option value="3months">3 mois</option>
              <option value="6months">6 mois</option>
            </select>
          </div>

          <div className="space-y-4">
            {upcomingTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    transaction.type === 'inflow' 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'inflow' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.client}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'inflow' 
                      ? 'text-emerald-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'inflow' ? '+' : '-'}€{transaction.amount.toLocaleString()}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProbabilityColor(transaction.probability)}`}>
                    {getProbabilityText(transaction.probability)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800">
                <strong>Solde prévisionnel dans 30 jours:</strong> €47,650
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};