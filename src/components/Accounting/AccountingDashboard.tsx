import React, { useState } from 'react';
import { Calculator, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Building } from 'lucide-react';

const accountingMetrics = [
  {
    title: 'Écritures en attente',
    value: '12',
    change: '-3 depuis hier',
    icon: Clock,
    color: 'bg-orange-500',
    isPositive: true
  },
  {
    title: 'Rapprochements à faire',
    value: '5',
    change: '+2 cette semaine',
    icon: AlertTriangle,
    color: 'bg-red-500',
    isPositive: false
  },
  {
    title: 'Déclarations à venir',
    value: '2',
    change: 'TVA dans 15 jours',
    icon: FileText,
    color: 'bg-blue-500',
    isPositive: true
  },
  {
    title: 'Conformité',
    value: '98%',
    change: '+2% ce mois',
    icon: CheckCircle,
    color: 'bg-emerald-500',
    isPositive: true
  }
];

const recentEntries = [
  {
    id: 1,
    date: '2024-01-15',
    account: '411000',
    accountName: 'Clients',
    description: 'Facture F-2024-001 - Société XYZ',
    debit: 2850,
    credit: 0,
    status: 'validated'
  },
  {
    id: 2,
    date: '2024-01-15',
    account: '701000',
    accountName: 'Ventes de marchandises',
    description: 'Facture F-2024-001 - Société XYZ',
    debit: 0,
    credit: 2375,
    status: 'validated'
  },
  {
    id: 3,
    date: '2024-01-15',
    account: '445710',
    accountName: 'TVA collectée',
    description: 'Facture F-2024-001 - Société XYZ',
    debit: 0,
    credit: 475,
    status: 'validated'
  },
  {
    id: 4,
    date: '2024-01-14',
    account: '607000',
    accountName: 'Achats de marchandises',
    description: 'Facture fournisseur FF-2024-025',
    debit: 850,
    credit: 0,
    status: 'pending'
  }
];

export const AccountingDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Comptabilité</h2>
          <p className="text-gray-600">Gestion comptable complète et conforme</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Calculator className="w-4 h-4 mr-2" />
            Nouvelle écriture
          </button>
        </div>
      </div>

      {/* Métriques comptables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {accountingMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{metric.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions rapides comptables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Écritures récentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compte</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Débit</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Crédit</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(entry.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{entry.account}</div>
                          <div className="text-xs text-gray-500">{entry.accountName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {entry.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        {entry.debit > 0 ? `€${entry.debit.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        {entry.credit > 0 ? `€${entry.credit.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          entry.status === 'validated' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {entry.status === 'validated' ? 'Validée' : 'En attente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-50 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <Calculator className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Saisie guidée</p>
                    <p className="text-sm opacity-75">Nouvelle écriture comptable</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg hover:bg-emerald-100 transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Rapprochement</p>
                    <p className="text-sm opacity-75">Rapprochement bancaire</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full bg-purple-50 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Déclarations</p>
                    <p className="text-sm opacity-75">TVA et obligations</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Collaboration expert-comptable */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Collaboration</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Expert-comptable</p>
                  <p className="text-sm text-gray-600">Cabinet Comptable Mayotte</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Nouveau message:</strong> Validation des écritures de décembre en cours
                </p>
                <p className="text-xs text-blue-600 mt-1">Il y a 2 heures</p>
              </div>
              
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Accéder à l'espace collaboratif
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};